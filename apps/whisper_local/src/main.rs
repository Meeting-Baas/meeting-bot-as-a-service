use std::path::Path;
use std::io::{Write, Read};
use std::fs::{File, remove_file};

use whisper_rs::{WhisperContext, WhisperContextParameters, FullParams, SamplingStrategy};
use anyhow::{Result, Context};
use reqwest::blocking::Client;
use indicatif::{ProgressBar, ProgressStyle};

const MODEL_NAME: &str = "ggml-base.en.bin";
const MODEL_PATH: &str = "ggml-base.en.bin";

fn main() -> Result<()> {
    if !Path::new(MODEL_PATH).exists() {
        println!("🔍 Model not found. Downloading...");
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

    let _params = FullParams::new(SamplingStrategy::Greedy { best_of: 1 });
    println!("🎙️ Ready for transcription!");
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