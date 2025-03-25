use tauri;
use std::fs;
use std::path::Path;

//creates a new subdirectory in the song directory (for the create new collection button)]

#[tauri::command(rename_all = "snake_case")]
pub fn create_song_directory(name: String) -> Result<(), String> {
    let path = format!("../../../src/songs/{name}");

    if name.is_empty() {
        return Err("Collection name cannot be empty".into());
    }
    
    let my_path = Path::new(&path);

    match my_path.exists() {
        true => return Ok(()),
        false => fs::create_dir(my_path).map_err(|err| err.to_string())?,
    }

    Ok(())
}
