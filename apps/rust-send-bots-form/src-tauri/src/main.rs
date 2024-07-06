use serde::{Deserialize, Serialize};
use tauri::Manager;
use reqwest::Client;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct MeetingPayload {
    meeting_url: String,
    bot_name: Option<String>,
    bot_image: Option<String>,
    entry_message: Option<String>,
    api_key: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct MeetingResponse {
    success: bool,
    message: String,
}

#[tauri::command]
async fn submit_meeting(payload: MeetingPayload) -> Result<MeetingResponse, String> {
    let client = Client::new();
    let mut request = client
        // .post("http://localhost:3001/bots/join")
        .post("http://127.0.0.1:3001/bots/join")
        // .post("https://api.meetingbaas.com/bots")
        .header("Content-Type", "application/json");

    if let Some(api_key) = payload.api_key.clone() {
        request = request.header("x-spoke-api-key", api_key);
    }

let response = request
    .json(&payload)
    .send()
    .await
    .map_err(|e| format!("Request error: {}", e))?;

if response.status().is_success() {
    Ok(MeetingResponse {
        success: true,
        message: "Meeting joined successfully".to_string(),
    })
} else {
    let status = response.status();
    let body = response.text().await.unwrap_or_else(|e| format!("Failed to read response body: {}", e));
    // log::error!("Failed to join meeting. Status: {}, Body: {}", status, body);
    Err(format!("Failed to join meeting. Status: {}, Body: {}", status, body))
}
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window.set_title("🐟  Meeting Baas  🐟").unwrap();

            // Make the window resizable
            window.set_resizable(true).unwrap();
            window.center().unwrap();


            Ok(())
        })
        .invoke_handler(tauri::generate_handler![submit_meeting])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
