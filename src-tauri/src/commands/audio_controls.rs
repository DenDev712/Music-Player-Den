#[tauri::command(rename_all = "snake_case")]
fn play_soung(audio_file_path: String) -> Result<(), Box<dyn std::error::Error>>{
    let stream_handle = rodio::OutputStream::open_default()?;
    let sink = rodio::Sink::connect_new(&stream_handle.mixer())?;

    let file = File::open(audio_file_path)?;
    sink.appens(rodio::Decoder::new(file)?);

    sink.sleep_until_end();
    Ok(())
}