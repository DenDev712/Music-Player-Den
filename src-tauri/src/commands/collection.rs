use tauri;
use std::fs;
use std::path::{Path, PathBuf};
//creates a new subdirectory in the song directory (for the create new collection button)]

#[tauri::command(rename_all = "snake_case")]
pub fn create_song_directory(name: String) -> Result<PathBuf, String> {
    //gets the path to the user's song directory
    let user_song_dir = dirs::audio_dir().map(|mut path|{
        //appends the name of the new collection to the path
        path.push(name);

        match name.is_empty(){
            true => return Err("Collection name cannot be empty".into()),
            false => return Ok(()),
        }

        match my_path.exists() {
            true => Ok(path),
            false => fs::create_dir(&path).map(|_| path).map_err(|err| err.to_string()),
        }
    })
    .ok_or_else(|| "Could not get song directory path".to_string())?;
}

