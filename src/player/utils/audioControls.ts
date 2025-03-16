import { songs} from '../store/audioStore';
import { updateProgress } from './progress';
import { writable } from 'svelte/store';

//the audio itself
export let audioElement: HTMLAudioElement;
//for the song selection
export const SongIndex = {currentSongIndex: 0}
export let currentSong= songs[SongIndex.currentSongIndex];
//for the play button whether the audio is playing or not
export let isPlaying = writable(false);
//for the looping function
export let looping: boolean = false;


export function loadSong() {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.removeEventListener('timeupdate', updateProgress);
    audioElement.removeEventListener('ended', nextSong);
  }
  
  audioElement = new Audio(currentSong.src);
  audioElement.addEventListener('loadedmetadata', () => {
    songs[SongIndex.currentSongIndex].duration = audioElement.duration;
  });
  
  audioElement.addEventListener('timeupdate',updateProgress);
  audioElement.addEventListener('ended', () => {
    if(looping){
      audioElement.play();
    }else{
      nextSong;
    }
  });
  
  if (isPlaying) audioElement.play();
}

//for the play / pause button
export function togglePlay() {
  if(!audioElement) return;
  isPlaying ? audioElement.pause() : audioElement.play();
  isPlaying.set(!isPlaying);
} 

//for the next button
export function nextSong(){
  looping = false;
  const wasPlaying = isPlaying;
  SongIndex.currentSongIndex = (SongIndex.currentSongIndex + 1) % songs.length;
  currentSong = songs[SongIndex.currentSongIndex];
  loadSong();
  
  if(!wasPlaying){
    audioElement.play();
    isPlaying.set(true);
  }
}
//for the previous button
export function previousSong() {
  const wasPlaying = isPlaying; 
  SongIndex.currentSongIndex = (SongIndex.currentSongIndex - 1 + songs.length) % songs.length;
  currentSong = songs[SongIndex.currentSongIndex];
  loadSong();

  if(!wasPlaying){
    audioElement.play();
    isPlaying.set(true);
  }
}

//for the loop button
export function loopSong(){
  looping = !looping;
}
