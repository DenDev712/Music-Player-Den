import { invoke } from '@tauri-apps/api/core';
import { writable } from 'svelte/store';

export type SongInfo = {
  path: string;
  title: string;
  artist: string;
  duration?: number;
  cover: string;
};
export const songs = writable<SongInfo[]>([]);
export async function songsList(){
  try {
    const result = await invoke<SongInfo[]>("read_audio_folder");
    songs.set(result);
  } catch (err) {
      console.error("Failed to load songs:", err);
  }
};