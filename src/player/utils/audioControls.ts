<<<<<<< HEAD
import {songs} from '../player/store/audioStore'
=======
import {songs} from '../store/audioStore'
>>>>>>> 1a5b219439155e3df49ca81a0d7c1b50745320c9
import { updateProgress } from './progress';
export interface Song {
    src: string;
    artist: string;
    title: string;
    cover: string;
    duration?: number;
  }
  
  export let audioElement: HTMLAudioElement;
  export let isPlaying = false;
  export let looping = false;
  
  export function loadSong(songs: Song[], currentSongIndex: number) {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.removeEventListener('timeupdate', updateProgress);
      audioElement.removeEventListener('ended', () => nextSong(songs, currentSongIndex));
    }
  
    audioElement = new Audio(songs[currentSongIndex].src);
    audioElement.addEventListener('loadedmetadata', () => {
      songs[currentSongIndex].duration = audioElement.duration;
    });
  
    audioElement.addEventListener('timeupdate', callback);
    audioElement.addEventListener('ended', () => {
      if(looping){
        audioElement.play();
      }else{
        nextSong(songs, currentSongIndex);
      }
    });
  
    if (isPlaying) audioElement.play();
  }
  
  export function togglePlay() {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  
    isPlaying = !isPlaying;
  }
  
  export function nextSong(songs: Song[], currentSongIndex: number): number {
      looping = false;
      const wasPlaying = isPlaying;
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      currentSong = songs[currentSongIndex];
      loadSong(songs, currentSongIndex);
  
      if(!wasPlaying){
        audioElement.play();
        isPlaying = true;
      }
  }
  
  export function previousSong(songs: Song[], currentSongIndex: number): number {
    return (currentSongIndex - 1 + songs.length) % songs.length;
  }
  
  export function loopSong(){
    looping = !looping;
  }
