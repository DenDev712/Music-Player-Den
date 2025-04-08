import {songs} from '../store/audioStore';
import {get} from 'svelte/store'
import { currentSongIndex, loadSong, audioElement,isPlaying, currentSong} from './audioControls';


export function searchSong() {
  const searchTerm: string | undefined = prompt("Search for a song/artist")?.trim();

    if(!searchTerm) return;
    const normalizedSearch = searchTerm.toLowerCase();

    const foundIndex = get(songs).findIndex(song =>
      song.title.toLowerCase().includes(normalizedSearch) ||
      song.artist.toLowerCase().includes(normalizedSearch)
    );

    if(foundIndex !== -1) {

      currentSongIndex.set(foundIndex);
      loadSong();
      audioElement.play();
      isPlaying.set(true);
    }else{
      alert("Song not found")
    }
}
