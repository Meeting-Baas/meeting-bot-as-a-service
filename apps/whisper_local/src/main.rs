use anyhow::Result;
mod whisper_interaction;
use serde_json::{json, Value};
use std::fs;
use whisper_interaction::transcription_interaction;

fn parse_spoke_to_baas(input: &str) -> Result<String> {
    let spoke_data: Value = serde_json::from_str(input)?;
    let bot_id = spoke_data["id"].as_i64().unwrap_or(0).to_string();
    let mp4 = spoke_data["final_zip_path"]
        .as_str()
        .unwrap_or("")
        .to_string();
    let speakers = spoke_data["attendees"]
        .as_array()
        .map(|attendees| {
            attendees
                .iter()
                .filter_map(|attendee| attendee["name"].as_str())
                .map(String::from)
                .collect::<Vec<String>>()
        })
        .unwrap_or_default();

    let transcript = spoke_data["editors"]
        .as_array()
        .map(|editors| {
            editors
                .iter()
                .filter_map(|editor| editor["video"]["transcripts"].as_array())
                .flatten()
                .map(|t| {
                    json!({
                        "speaker": t["speaker"],
                        "words": t["words"].as_array().unwrap_or(&Vec::new()).iter().map(|w| {
                            json!({
                                "start": w["start_time"],
                                "end": w["end_time"],
                                "word": w["text"]
                            })
                        }).collect::<Vec<Value>>()
                    })
                })
                .collect::<Vec<Value>>()
        })
        .unwrap_or_default();

    let baas_data = json!({
        "event": "complete",
        "data": {
            "bot_id": bot_id,
            "mp4": mp4,
            "speakers": speakers,
            "transcript": transcript
        }
    });
    Ok(serde_json::to_string_pretty(&baas_data)?)
}

fn parse_spoke_to_get_route(input: &str) -> Result<String> {
    let spoke_data: Value = serde_json::from_str(input)?;

    let transcripts = spoke_data["data"]["editors"]
        .as_array()
        .map(|editors| {
            editors
                .iter()
                .filter_map(|editor| editor["video"]["transcripts"].as_array())
                .flatten()
                .cloned()
                .collect::<Vec<Value>>()
        })
        .unwrap_or_default();

    let assets = spoke_data["data"]["assets"]
        .as_array()
        .map(|assets| {
            assets
                .iter()
                .map(|asset| {
                    json!({
                        "mp4_s3_path": asset["mp4_s3_path"]
                    })
                })
                .collect::<Vec<Value>>()
        })
        .unwrap_or_default();

    let get_route_data = json!({
        "data": {
            "id": spoke_data["data"]["id"],
            "name": spoke_data["data"]["name"],
            "editors": [
                {
                    "video": {
                        "transcripts": transcripts
                    }
                }
            ],
            "assets": assets
        }
    });

    Ok(serde_json::to_string_pretty(&get_route_data)?)
}

//fn wrap_in_baas_webhook(input: &str) -> Result<String> {
//    let parsed_data: Value = serde_json::from_str(input)?;
//    let webhook_data = json!({
//        "event": "complete",
//        "data": parsed_data
//    });
//    Ok(serde_json::to_string_pretty(&webhook_data)?)
//}

//"mp4": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
fn main() -> Result<()> {
    let input = std::fs::read_to_string("input.json")?;
    //let output = parse_spoke_to_baas(&input)?;
    let output = parse_spoke_to_get_route(&input)?;
    // let wrapped_output = wrap_in_baas_webhook(&output)?;

    println!("{}", output);
    fs::write("output.json", output)?;
    println!("✅ Parsed data saved to output.json");

    // transcription_interaction()?;
    Ok(())
}
