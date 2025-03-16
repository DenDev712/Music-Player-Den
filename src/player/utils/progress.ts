import { audioElement } from "./audioControls";
export let progress: number = 0;
export let duration: number = 0;
export let currentTime: number = 0;
export function updateProgress() {
    if (!audioElement) return;
  
    const currentTime = audioElement.currentTime;
    duration = audioElement.duration;
    progress = ((currentTime / duration) * 100);
  }
  
  export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  