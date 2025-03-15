export function updateProgress(audioElement: HTMLAudioElement, setProgress: (progress: number) => void) {
    if (!audioElement) return;
  
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    setProgress((currentTime / duration) * 100);
  }
  
  export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  