import { audioElement } from "./audioControls";
import {writable, get} from 'svelte/store'

export let progress = writable(0);
export let duration = writable(0);
export let currentTime = writable(0);

export function updateProgress() {
    if (!audioElement) return;
  
    currentTime.set(audioElement.currentTime);
    duration.set(audioElement.duration);
    progress.set((get(currentTime) / get(duration)) * 100);
  }
  
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
  