use walkdir::WalkDir;
use symphonia::core::io::MediaSourceStream;
use symphonia::core::meta::MetadataOptions;
use symphonia::core::probe::Hint;
use std::fs::{File, create_dir_all};
use std::io::Write;
use std::path::PathBuf;
use serde::Serialize;
use tauri::command;

#[derive(Serialize)]
struct SongInfo {
    path: String,
    title: Option<String>,
    artist: Option<String>,
    duration: Option<u64>, 
    cover_path: Option<String>,
}

#[command]
fn read_audio_folder(folder_path: String, cover_output_dir: String) -> Vec<SongInfo> {
    let mut songs = Vec::new();

    // Ensure the output directory for covers exists
    let cover_dir = PathBuf::from(&cover_output_dir);
    let _ = create_dir_all(&cover_dir);
     //iterating through the audio_path
    for entry in WalkDir::new(&folder_path).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        //checks the files extension
        if path.extension().map_or(false, |ext| ext == "mp3" || ext == "flac" || ext == "m4a") {
            if let Ok(file) = File::open(path) {
                let mss = MediaSourceStream::new(Box::new(file), Default::default());
                let mut hint = Hint::new();
                if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
                    hint.with_extension(ext);
                }

                if let Ok(probed) = symphonia::default::get_probe().format(&hint, mss, &Default::default(), &MetadataOptions::default()) {
                    let format = probed.format;
                    let metadata = format.metadata().current();
                    let title = metadata
                                    .and_then(|m| m.tags().iter().find(|t| t.key == "title").map(|t| t.value.to_string()))
                                    .unwrap_or_else(|| "Unknown Title".to_string());
                    // Extract artist name          
                    let artist = metadata
                                    .and_then(|m| m.tags().iter().find(|t| t.key == "artist").map(|t| t.value.to_string()))
                                    .unwrap_or_else(|| "Unknown Artist".to_string());
                    let duration = format.default_track().map(|track| track.codec_params.n_frames.map(|f| f / track.codec_params.sample_rate.unwrap_or(1) as u64));
                    
                    // Extract cover image
                    let mut cover_path = None;
                    if let Some(meta) = metadata {
                        if let Some(picture) = meta.visuals().first() {
                            let cover_filename = format!(
                                "{}.jpg",
                                path.file_stem().unwrap().to_string_lossy()
                            );
                            let cover_filepath = cover_dir.join(&cover_filename);
                            if let Ok(mut file) = File::create(&cover_filepath) {
                                let _ = file.write_all(&picture.data);
                                cover_path = Some(cover_filepath.to_string_lossy().into());
                            }
                        }
                    }
                    songs.push(SongInfo {
                        path: path.to_string_lossy().into(),
                        title: Some(title),
                        artist: Some(artist),
                        duration: duration.flatten(),
                        cover_path,
                    });
                }
            }
        }
    }
    songs
}