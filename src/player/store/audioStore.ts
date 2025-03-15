import { writable } from 'svelte/store';
import type { Song } from '../utils/audioControls';

//for the songs selection
export const currentSongIndex = 0;
export const isPlaying = writable(false);
export const progress = writable(0);
export const songs = writable<Song[]>([
  {
    src: 'src/songs/song2/the-smiths.mp3',
    artist: 'The Smiths',
    title: 'Bigmouth Strikes Again',
    cover: 'src/songs/song2/thesmiths.jpg',
  },
  {
    src: 'src/songs/song1/A Heart Like Hers.mp3',
    artist: 'Mac Demarco',
    title: 'A Heart Like Hers',
    cover: 'src/songs/song1/macdemarco.jpg',
  }
]);
