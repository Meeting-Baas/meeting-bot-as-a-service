use tauri::Manager;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window.set_title("🔵 Meeting Bass 🔵").unwrap();
            window.set_resizable(false).unwrap();
            window.set_fullscreen(true).unwrap();
            // window.center().unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
