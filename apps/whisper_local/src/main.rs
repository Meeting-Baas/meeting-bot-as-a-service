use anyhow::{Result};
mod whisper_interaction;
use whisper_interaction::transcription_interaction;


fn main() -> Result<()> {
    // parse_spoke_to_baas()?;
    transcription_interaction()?;
    Ok(())
}
