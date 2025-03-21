// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod music;
fn main() {
    music::read_song_directory();
    music_player_den_lib::run();
}
