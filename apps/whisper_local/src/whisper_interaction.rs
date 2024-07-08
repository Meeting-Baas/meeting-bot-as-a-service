use anyhow::{Context, Result};
use hound::WavReader;
use indicatif::{ProgressBar, ProgressStyle};
use reqwest::blocking::Client;
use std::fs::{remove_file, File};
use std::io::{Read, Write};
use std::path::Path;
use whisper_rs::convert_integer_to_float_audio;
use whisper_rs::{FullParams, SamplingStrategy, WhisperContext, WhisperContextParameters};

const MODEL_NAME: &str = "ggml-large-v3.bin";
const MODEL_PATH: &str = "ggml-large-v3.bin";

// TODO: transcription quality sucks for now on my M3 machine (lol)
pub fn transcription_interaction() -> Result<()> {
    ensure_model_exists()?;
    let ctx = initialize_whisper()?;
    let params = create_full_params();
    // let audio_samples = load_audio_samples("./customer_service_akward_puppets.wav")?;
    let audio_samples = load_audio_samples("./obama_speaks_about_trump.wav")?;
    transcribe_audio(&ctx, params, &audio_samples)?;
    Ok(())
}

// Ensures the model file exists, downloading it if necessary
fn ensure_model_exists() -> Result<()> {
    if !Path::new(MODEL_PATH).exists() {
        println!("🔍 Model: {} not found. Downloading...", MODEL_PATH);
        download_model().context("Failed to download model")?;
    } else {
        println!("✅ Model already installed");
    }
    Ok(())
}

// Initializes the Whisper context, re-downloading the model if necessary
fn initialize_whisper() -> Result<WhisperContext> {
    println!("🚀 Initializing Whisper...");
    match WhisperContext::new_with_params(MODEL_PATH, WhisperContextParameters::default()) {
        Ok(ctx) => Ok(ctx),
        Err(e) => {
            println!(
                "❌ Failed to load model: {}. Deleting and re-downloading...",
                e
            );
            remove_file(MODEL_PATH)?;
            download_model().context("Failed to download model")?;
            WhisperContext::new_with_params(MODEL_PATH, WhisperContextParameters::default())
                .context("Failed to initialize Whisper context")
        }
    }
}

// Creates and configures FullParams for transcription
// fn create_full_params() -> FullParams {
fn create_full_params() -> FullParams<'static, 'static> {
    let mut params = FullParams::new(SamplingStrategy::Greedy { best_of: 0 });
    //let mut params = FullParams::new(SamplingStrategy::BeamSearch {
    //    beam_size: 5,
    //    patience: 1.0,
    //});

    params.set_n_threads(62);
    params.set_translate(true);
    params.set_language(Some("en"));
    params.set_print_special(false);
    params.set_print_progress(false);
    params.set_print_realtime(true);
    params.set_print_timestamps(false);
    params.set_token_timestamps(true);

    // params.set_n_max_text_ctx(16384);
    params.set_n_max_text_ctx(32768); // Increase context size
    params.set_suppress_blank(true);
    params.set_suppress_non_speech_tokens(true);
    params.set_temperature(0.0);
    params.set_temperature_inc(0.2);

    params
}

// Loads and converts audio samples from a WAV file
fn load_audio_samples(file_path: &str) -> Result<Vec<f32>> {
    let mut reader = WavReader::open(file_path)?;
    let samples: Vec<i16> = reader.samples::<i16>().filter_map(Result::ok).collect();
    let mut audio_samples = vec![0.0f32; samples.len()];
    convert_integer_to_float_audio(&samples, &mut audio_samples)
        .context("Failed to convert audio samples")?;
    Ok(audio_samples)
}

// Performs the audio transcription and prints the results
fn transcribe_audio(ctx: &WhisperContext, params: FullParams, audio_samples: &[f32]) -> Result<()> {
    println!("🎙️ Ready for transcription!");
    let mut state = ctx.create_state().context("Failed to create state")?;
    state
        .full(params, audio_samples)
        .context("Failed to run model")?;
    let num_segments = state
        .full_n_segments()
        .context("Failed to get number of segments")?;
    for i in 0..num_segments {
        let segment = state
            .full_get_segment_text(i)
            .context("Failed to get segment")?;
        let start = state
            .full_get_segment_t0(i)
            .context("Failed to get segment start")?;
        let end = state
            .full_get_segment_t1(i)
            .context("Failed to get segment end")?;
        println!("[{} - {}]: {}", start, end, segment);
    }
    // Add your transcription logic here
    Ok(())
}

fn download_model() -> Result<()> {
    let url = format!(
        "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/{}",
        MODEL_NAME
    );
    let client = Client::new();
    let mut res = client.get(&url).send()?;
    let total_size = res.content_length().unwrap_or(0);

    let pb = ProgressBar::new(total_size);
    pb.set_style(ProgressStyle::default_bar()
        .template("{spinner:.green} [{elapsed_precise}] [{wide_bar:.cyan/blue}] {bytes}/{total_bytes} ({eta})")
        .unwrap()
        .progress_chars("#>-"));

    let mut file = File::create(MODEL_PATH)?;
    let mut downloaded: u64 = 0;

    let mut buffer = [0; 8192]; // 8KB buffer
    while let Ok(size) = res.read(&mut buffer) {
        if size == 0 {
            break;
        }
        file.write_all(&buffer[..size])?;
        downloaded += size as u64;
        pb.set_position(downloaded);
    }

    pb.finish_with_message("✅ Model downloaded successfully");
    Ok(())
}
