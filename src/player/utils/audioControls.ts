import { songs} from '../store/audioStore';
import { updateProgress} from './progress';
import { writable, get, derived } from 'svelte/store';

//the audio itself
export let audioElement: HTMLAudioElement;
//for the song selection
export let currentSongIndex = writable(0);
export const currentSong = derived([songs, currentSongIndex], ([$songs, $currentSongIndex]) => $songs[$currentSongIndex]);
//for the play button whether the audio is playing or not
export const isPlaying = writable(false);
//for the looping function
export const looping = writable(false);


export function loadSong() {
  const song = get(currentSong);
  if(!song) return;
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.removeEventListener('timeupdate', updateProgress);
    audioElement.removeEventListener('ended', nextSong);
  }
  
  audioElement = new Audio(song.path);
  audioElement.addEventListener('loadedmetadata', () => {
    song.duration = audioElement.duration;
  });
  
  audioElement.addEventListener('timeupdate',updateProgress);
  audioElement.addEventListener('play', () => isPlaying.set(true));
  
  audioElement.addEventListener('error', () => isPlaying.set(false));
  audioElement.addEventListener('ended', () => {
    if(get(looping) === true){
      audioElement.play();
    }else{
      nextSong();
    }
  });
  
  if (get(isPlaying)) audioElement.play();
}

//for the play / pause button
export function togglePlay() {
  if(!audioElement) return;
  const playing =  get(isPlaying);
  playing ? audioElement.pause() : audioElement.play();
  isPlaying.set(!playing);
} 

//for the next button
export function nextSong(){
  looping.set(false);
  const wasPlaying = get(isPlaying);
  currentSongIndex.update(i => (i + 1) % get(songs).length);
  loadSong();
  
  if(!wasPlaying){
    audioElement.play();
    isPlaying.set(true);
  }
}
//for the previous button
export function previousSong() {
  const wasPlaying = get(isPlaying); 
  currentSongIndex.update(i => (i - 1) % get(songs).length);
  loadSong();

  if(!wasPlaying){
    audioElement.play();
    isPlaying.set(true);
  }
}

//for the loop button
export function loopSong(){
  looping.set(!get(looping));
}
