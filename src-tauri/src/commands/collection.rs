use tauri;
use std::fs;
use std::path::PathBuf;
//creates a new subdirectory in the song directory (for the create new collection button)]

#[tauri::command(rename_all = "snake_case")]
#[allow(dead_code)]
pub fn create_song_directory(name: String) -> Result<PathBuf, String> {
    if name.is_empty() {
        return Err("Collection name cannot be empty".into());
    }

    //gets the path to the user's song directory
    let mut path = dirs::audio_dir()
        .ok_or_else(|| "Could not get song directory path".to_string())?;
    
    //appends the name of the new collection to the path
    path.push(name);

    if path.exists() {
        Ok(path)
    } else {
        fs::create_dir(&path)
            .map(|_| path)
            .map_err(|err| err.to_string())
    }
}

/*
pub fn rename_directory(name: String) -> std::io::Result<()>{
    fs::rename("a.txt", "b.txt")?;
    Ok(())
}

 */