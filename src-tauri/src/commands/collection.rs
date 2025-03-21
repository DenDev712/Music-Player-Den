use std::fs;
use std::path::Path;

//creates a new subdirectory in the song directory (for the create new collection button)
pub fn create_song_directory() -> Result<(), Box<dyn std::error::Error>>{
    let path = "./src/songs/song";
    let my_path = Path::new(path);
    //checks if the dir already exists
    if my_path.exists(){
        return;
    }
    //if it doesnt it will create it
    fs::create_dir(path)?;
    Ok(())
}