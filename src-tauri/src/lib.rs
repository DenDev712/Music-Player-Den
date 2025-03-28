mod commands;
use tauri;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::collection::create_song_directory,
            commands::collection::rename_directory,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
