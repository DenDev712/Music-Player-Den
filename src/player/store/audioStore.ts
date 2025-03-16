
export interface Song {
  src: string;
  artist: string;
  title: string;
  cover: string;
  duration?: number;
}
export const songs :Song[] =[
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
];
