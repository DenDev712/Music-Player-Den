import { audioElement } from "./audioControls";
import {duration} from "./progress"
import {get} from 'svelte/store'
import { isPlaying} from "./audioControls";
export function handleMouseDown(event: MouseEvent) {
    if(!audioElement) return;
    const progressBar = event.currentTarget as HTMLElement;

    if (get(isPlaying)){
      //when the user moves the progress bar the music will pause until the user lets go 
      audioElement.pause();
    }

    const seek = (event: MouseEvent) => {
      //rect is the left of the viewport 
      const rect = progressBar.getBoundingClientRect().left;
      //x_cord is the current mouse client coordinates on the x axis - the left viewport so the bar is accurate to the mouse position
      const x_cord = event.clientX - rect; 
      let percentage = x_cord / progressBar.offsetWidth; 
      //the current time updated based on the progress and duration so for ex 50% of the bar will go to the half of the song
      audioElement.currentTime = percentage * get(duration);
    };

    //handling mouse move
    const handleMouseMove = (event: MouseEvent) => {
      seek(event);
    };

    //so it doesnt act when the user does mouse up 
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if(get(isPlaying)){
        audioElement.play().catch((error) => {
          console.error('Playback failed:', error);
          isPlaying.set(false);
        });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    seek(event);
}