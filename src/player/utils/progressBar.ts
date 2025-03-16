import { audioElement } from "./audioControls";
import {duration} from "./progress"
import { isPlaying} from "./audioControls";
export function handleMouseDown(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    //when the user moves the progress bar the music will pause until the user lets go 
    audioElement.pause(); 
    const seek = (event: MouseEvent) => {
      //rect is the left of the viewport 
      const rect = progressBar.getBoundingClientRect().left;
      //x is the current mouse client coordinates on the x axis - the left viewport so the bar is accurate to the mouse position
      const x = event.clientX - rect; 
      let percentage = x / progressBar.offsetWidth; 
      //the current time updated based on the progress and duration so 50% of the bar will go to the half of the song
      audioElement.currentTime = percentage * duration;
    };

    //handling mouse move
    const handleMouseMove = (event: MouseEvent) => {
      seek(event);
    };

    //so it doesnt act when the user does mouse up 
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      //so when the user goes mouseup the audio plays
      audioElement.play();
      //so when the paused icon changes to play icon when the user moves the progress bar
      isPlaying.set(true);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    seek(event);
}