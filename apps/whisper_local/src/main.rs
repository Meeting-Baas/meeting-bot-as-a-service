use std::path::Path;
use std::io::{Write, Read};
use std::fs::{File, remove_file};

use whisper_rs::{WhisperContext, WhisperContextParameters, FullParams, SamplingStrategy};
use anyhow::{Result, Context};
use reqwest::blocking::Client;
use indicatif::{ProgressBar, ProgressStyle};
use hound::WavReader;
use whisper_rs::convert_integer_to_float_audio;


const MODEL_NAME: &str = "ggml-large-v3.bin";
const MODEL_PATH: &str = "ggml-large-v3.bin";

fn main() -> Result<()> {
    if !Path::new(MODEL_PATH).exists() {
        println!("🔍 Model: {} not found. Downloading...", MODEL_PATH);
        download_model().context("Failed to download model")?;
    } else {
        println!("✅ Model already installed");
    }

    println!("🚀 Initializing Whisper...");
    let ctx_result = WhisperContext::new_with_params(
        MODEL_PATH,
        WhisperContextParameters::default()
    );
    if let Err(e) = ctx_result {
             println!("❌ Failed to load model: {}. Deleting and re-downloading...", e);
        remove_file(MODEL_PATH)?;
        download_model().context("Failed to download model")?;
    }

    let params = FullParams::new(SamplingStrategy::Greedy { best_of: 1 });


    println!("🎙️ Ready for transcription!");
    let mut reader = WavReader::open("./customer_service_akward_puppets.wav")?;
    let samples: Vec<i16> = reader.samples::<i16>().filter_map(Result::ok).collect();
    
    let mut audio_samples = vec![0.0f32; samples.len()];
    convert_integer_to_float_audio(&samples, &mut audio_samples).context("Failed to convert audio samples")?;

    let mut state = ctx_result?.create_state().context("Failed to create state")?;
    state.full(params, &audio_samples).context("Failed to run model")?;



    let num_segments = state.full_n_segments().context("Failed to get number of segments")?;
    for i in 0..num_segments {
        let segment = state.full_get_segment_text(i).context("Failed to get segment")?;
        let start = state.full_get_segment_t0(i).context("Failed to get segment start")?;
        let end = state.full_get_segment_t1(i).context("Failed to get segment end")?;
        println!("[{} - {}]: {}", start, end, segment);
    };



    // Add your transcription logic here
    Ok(())
}

fn download_model() -> Result<()> {
    let url = format!("https://huggingface.co/ggerganov/whisper.cpp/resolve/main/{}", MODEL_NAME);
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
        if size == 0 { break; }
        file.write_all(&buffer[..size])?;
        downloaded += size as u64;
        pb.set_position(downloaded);
    }

    pb.finish_with_message("✅ Model downloaded successfully");
    Ok(())
}