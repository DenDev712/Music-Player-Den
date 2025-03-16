import {songs} from '../store/audioStore';
import { SongIndex , loadSong, audioElement,isPlaying} from './audioControls';


export function searchSong() {
  const searchTerm: string | undefined = prompt("Search for a song/artist")?.trim();

    if(!searchTerm) return;
    const normalizedSearch = searchTerm.toLowerCase();

    const foundIndex = songs.findIndex(song =>
      song.title.toLowerCase().includes(normalizedSearch) ||
      song.artist.toLowerCase().includes(normalizedSearch)
    );
    SongIndex.currentSongIndex = foundIndex;
    if(foundIndex !== -1) {
      SongIndex.currentSongIndex = foundIndex;
      //currentSong = songs[currentSongIndex];
      loadSong();
      audioElement.play();
      isPlaying.set(false);
    }else{
      alert("Song not found")
    }
}
