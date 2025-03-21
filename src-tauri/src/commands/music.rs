use std::io;
use tauri::command;
use std::fs::{self, DirEntry};
use std::path::Path;

#[tauri::command]
pub fn read_song_directory() -> std::io::Result<()> {

}