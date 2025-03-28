use tauri;
use std::fs;
use std::path::PathBuf;
//creates a new subdirectory in the song directory (for the create new collection button)]

#[tauri::command(rename_all = "snake_case")]
#[allow(dead_code)]
pub fn create_song_directory(name: String) -> Result<PathBuf, String> {
    let dir_path = audio_name_path(name)?;
    match dir_path.exists() {
        true => Ok(dir_path),
        false => fs::create_dir(&dir_path)
            .map(|_| dir_path)
            .map_err(|err| err.to_string())
    }
}

#[tauri::command(rename_all = "snake_case")]
#[allow(dead_code)]
pub fn rename_directory(name: String) -> Result<PathBuf, String>{
    let old_path = audio_path()?;
    let new_path = audio_name_path(name)?;

    fs::rename(&old_path, &new_path).map_err(|err| err.to_string())?;

    Ok(new_path)
}
fn audio_path() -> Result<PathBuf, String>{ 
    //gets the path to the user's song directory
    let path = dirs::audio_dir()
    .ok_or_else(|| "Could not get song directory path".to_string())?;
    Ok(path)
}

fn audio_name_path(name: String) -> Result<PathBuf, String> {
    if name.is_empty() {
        return Err("Collection name cannot be empty".into());
    }
    let mut path = audio_path()?;
    //appends the name of the new collection to the path
    path.push(name);

    Ok(path)
}


