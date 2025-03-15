import type { Song } from './audioControls';

export function searchSong(songs: Song[], searchTerm: string): number {
  const normalizedSearch: string | undefined = searchTerm.trim().toLowerCase();

  return songs.findIndex(song =>
    song.title.toLowerCase().includes(normalizedSearch) ||
    song.artist.toLowerCase().includes(normalizedSearch)
  );
}
