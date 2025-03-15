<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  interface Song {
    src: string;
    artist: string;
    title: string;
    cover: string;
    duration?: number;
  }

  const songs: Song[] = [
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
  //for the song selection
  let currentSongIndex = 0;
  let currentSong = songs[currentSongIndex];
  let audioElement: HTMLAudioElement;
  //for the play button
  let isPlaying = false;
  //for the progress bar
  let currentTime = 0;
  let duration = 0;
  let progress = 0;
  //for looping
  let looping = false;

  function loadSong(){
    if(audioElement){
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.removeEventListener('timeupdate', updateProgress); 
      audioElement.removeEventListener('ended', nextSong);
    }
      audioElement = new Audio(currentSong.src);
      audioElement.addEventListener('loadedmetadata', () => {
      currentSong.duration = audioElement.duration;
    });

    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', ()=>{
      if(looping){
        audioElement.play();
      }else{
        nextSong();
      }
    });

    if(isPlaying) audioElement.play();

  }

  //for the next and previous buttons
  function nextSong(){
    looping = false;
    const wasPlaying = isPlaying;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    currentSong = songs[currentSongIndex];
    loadSong();

    if(!wasPlaying){
      audioElement.play();
      isPlaying = true;
    }
  }

  function previousSong(){
    const wasPlaying = isPlaying; 
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    currentSong = songs[currentSongIndex];
    loadSong();

    if(!wasPlaying){
      audioElement.play();
      isPlaying = true;
    }  
  }
  //for the time progress  
  function updateProgress(){
    currentTime = audioElement.currentTime;
    duration = audioElement.duration;
    progress = (currentTime / duration) * 100;
  } 

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  //for the play button
  function togglePlay() {
    if(!audioElement) return;
    isPlaying ? audioElement.pause() : audioElement.play();
    isPlaying = !isPlaying;
  }
  //for the progress bar
  function handleMouseDown(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    
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
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    seek(event);
}

  //for the search function
  function searchSong(){
    const searchTerm: string | undefined = prompt("Search for a song/artist")?.trim();

    if(!searchTerm) return;
    const normalizedSearch = searchTerm.toLowerCase();

    const foundIndex = songs.findIndex(song =>
      song.title.toLowerCase().includes(normalizedSearch) ||
      song.artist.toLowerCase().includes(normalizedSearch)
    );

    if(foundIndex !== -1) {
      currentSongIndex = foundIndex;
      currentSong = songs[currentSongIndex];
      loadSong();
      audioElement.play();
      isPlaying = true; 
    }else{
      alert("Song not found")
    }
  }
  
  //looping song 
  function loopSong(){
    looping = !looping;
  }
  onMount(() => {
    loadSong();
  });

  function navigate_library(){
    goto('src/routes/libraryPage.svelte')
  }
</script>

<main class="container">
  <div class="playerContainer" id="unselectable">
    <img class="bgImg" src={currentSong.cover} alt="The Smiths Album Cover"/>
    <div class="play-buttons">
      <div class="circles">
        <button class="backwardsButton" type="button" aria-label="Skip backwards" ></button>
        <img class="reverse" src="/player_icons/forward.svg" alt="The reverse button" onclick={previousSong}/>
        <button class="playButton" type="button" onclick={togglePlay}>
          <div class="play">
            {#if isPlaying}
              <img id="pause"src="/player_icons/pause.svg" alt="the pause button"/>
            {:else}
              <img src="/player_icons/play.svg" alt="the play button"/>
            {/if}
          </div>
        </button>
        <button class="forwardButton" type="button" aria-label="skip forward" ></button>
        <img class="forward" src="/player_icons/forward.svg" alt="The forward button" onclick={nextSong}/>
      </div>
    </div>
    
    <div class="time-container">
      <div class="progress-bar" onmousedown={handleMouseDown}>
        <div class="fill_bar" style={`width: ${progress}%`}/>
      </div>
      <div class="time">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
    


    <div class="songTitle">
      {currentSong.title}
    </div>
    <div class="artist">
      {currentSong.artist}
    </div>
    <img class="cover" src="{currentSong.cover}" alt="Song Album Cover"/>
    
    <div class = "otherControls">
      <button class="loop" type="button">
      <!--here make the circles for these svg-->
        {#if looping === false}
        <img class="icon-loop" src="/player_icons/loop.svg" alt="Loop Audio" onclick={loopSong}/>
        {:else}
        <img class="icon-loop-bold" src="/player_icons/loop.svg" alt="Loop Audio" onclick={loopSong}/>
        {/if}
        
      </button>
      <button class="bookmark">
          <img class="icon-bookmark" src="/player_icons/bookmark.svg" alt="bookmark the song"/>
      </button>
    </div>
    <div class="controls">
      <img class="library" src="/player_icons/library.svg" alt="open the song library" onclick={navigate_library} />
      <img class="icon-search" src="/player_icons/search.svg" alt="Search for songs" onclick={searchSong}/>
      <img class="icon-settings" src="/player_icons/settings.svg" alt="open the settings"/>
    </div>
  </div>
</main>  


<style>
.container{
  height: 300px;
  width: 600px;
}
.playerContainer,
.playerContainer * {
  box-sizing: border-box;
}
#unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.playerContainer {
  background: rgba(82, 106, 86, 0.39);
    border-radius: 20px;
    width: 600px;
    height: 300px;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-areas:
      "cover info"
      "controls controls"
      "progress progress"
      "buttons buttons";
    padding: 20px;
}

.cover {
  grid-area:cover;
  border-radius: 20px;
  width: 113px;
  height: 113px;
  left: 34px;
  top: 27px;
  object-fit: cover;
  pointer-events:none
}
.bgImg {
  z-index: -1;
  border-radius: 20px;
  width: 600px;
  height: 300px;
  position:absolute;
  filter: blur(0.
  5px);
  object-fit: cover;
  pointer-events: none;
}

.play-buttons {
  padding: 6px 0px 6px 0px;
  display: flex;
  flex-direction: row;
  gap: 91px;
  align-items: center;
  justify-content: flex-start;
  margin-top:10px;
  width: 330px;
  height: 90px;
  position: absolute;
  left: 139px;
  top: 181px;
}

.circles {
  flex-shrink: 0;
  width: 330px;
  height: 90px;
  position: absolute;
  left: 50%;
  translate: -50%;
  top: 0px;
}
.backwardsButton {
  border:none;
  background: #d9d9d9;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 0px;
  top: 5px;
}
.playButton{
  border:none;
  background: #d9d9d9;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  position: absolute;
  left: 120px;
  top: 0px;
}
.forwardButton {
  border:none;
  background: #e5e5e5;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 258px;
  top: 5px;
}
.forward {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  position: absolute;
  left: 265px;
  top: 9px;
  overflow: visible;
}
.reverse {
  flex-shrink: 0;
  height:auto;  
  position: absolute;
  gap:10px;
  top:9px;
  left:auto;
  overflow: visible;
  rotate: 180deg;
}
.play {
  padding: 10px;
  height:20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
}

#pause {
  padding:8px;
}

.progress-bar{
  background: #d9d9d9;
  border-radius: 5px;
  width: 546px;
  height: 4px;
  position: absolute;
  left: 50%;
  translate: -50%;
  top: 163px;
  margin: 10px 0;
  cursor: pointer;
  overflow: hidden;
  z-index:1;
}

.fill_bar{
  transform: translateX(50%);
  background: #000000;
  border-radius: 5px;
  height: 4px;
  width: 0%;
  position: absolute;
  left: 0;
  translate: -50%;
  top: 0;
  cursor:pointer;
  transition: width 0.1s linear;
  z-index:2;
}

.time{
  grid-area: info;
  display:flex;
  justify-content: center;
  margin-top:160px;
  margin-left:370px;
  justify-content: center;
  font-family: "Inder-Regular", sans-serif;
  font-size: 13px;
}
.songTitle{
  color: #000000;
  text-align: center;
  font-family: "Inder-Regular", sans-serif;
  font-size: 32px;
  font-weight: 400;
  position: absolute;
  left: 173px;
  width: 345px;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: left;
}

.artist{
  
  color: #000000;
  text-align: center;
  font-family: "Inder-Regular", sans-serif;
  font-size: 32px;
  font-weight: 400;
  position: absolute;
  left: 173px;
  top: 50px;
  width: 345px;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content:left;
}
.loop {
  border:none;
  background: #d9d9d9;
  border-radius: 10px;
  padding: 7px 6px 7px 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 533px;
  top: 208px;
}
.icon-loop {
  flex-shrink: 0;
  width: 27.5px;
  height: 25px;
  position: relative;
  overflow: visible;
  aspect-ratio: 27.5/25;
}

.icon-loop-bold{
  flex-shrink: 0;
  width: 27.5px;
  height: 25px;
  position: relative;
  overflow: visible;
  aspect-ratio: 27.5/25;
  -webkit-filter: drop-shadow(0 0 8px black);  
    filter: drop-shadow(0 0 8px black);              
    filter: drop-shadow(0 0 0 8px black);   
  
}
.bookmark {
  border:none;
  background: #d9d9d9;
  border-radius: 10px;
  padding: 7px 10px 7px 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 34px;
  top: 208px;
}
.icon-bookmark {
  flex-shrink: 0;
  width: 20px;
  height: 25px;
  position: relative;
  overflow: visible;
  aspect-ratio: 20/25;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
  justify-content: flex-start;
  width: 25px;
  position: absolute;
  left: 544px;
  top: 35px;
}
.library {
  flex-shrink: 0;
  width: 25px;
  height: 20.45px;
  position: relative;
  overflow: visible;
  aspect-ratio: 25/20.45;
}
.icon-search {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  position: relative;
  overflow: visible;
  aspect-ratio: 1;
}
.icon-settings {
  flex-shrink: 0;
  width: 20px;
  height: 15px;
  position: relative;
  overflow: visible;
  aspect-ratio: 4/3;
}
</style>
