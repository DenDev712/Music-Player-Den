
<script lang="ts">
  import { invoke } from '@tauri-apps/api/core';
  import {formatTime} from '../../player/utils/progress';
  import {onMount} from 'svelte';
  import { songs, songsList } from '../../player/store/audioStore';
  import { togglePlay } from '../../player/utils/audioControls';
  

  onMount(() => {
    songsList();
  });
  async function collection_name() {
    //need this name so we can use it on rust for the create_dir path name
    const collection_name : string | null= prompt("Enter the collection name");
    if(!collection_name)return;

    try{
      await invoke('create_song_directory', {name : collection_name});
      alert(`Collection ${collection_name} created successfully!`);
    }catch (err){
      console.error('create song directory func not working', err);
    }
  }

  async function rename_collection() {
    const current_dir_name: string | null = prompt("Enter the current name of the collection to rename");
    if(!current_dir_name) return;

    const new_dir_name: string | null = prompt("Enter the new name");
    if(!new_dir_name) return;

    try{
      await invoke('rename_directory', {current_name: current_dir_name, name: new_dir_name});
      alert(`Collection ${current_dir_name} renamed to ${new_dir_name} successfully!`);
    }catch (err){
      console.error('rename song directory func not working', err);
    }
  }

</script>

<main class="library-container">
<div class="library">
    <div class="page-title">
      <div class="divider"></div>
      
      <div class="util_buttons">
        <div class="search_button"></div>
        <div class="add_button"></div>
        <div class="remove_button"></div>
        <div class="download_button"></div>
      </div>

      <div id="button_icons">
        <div class="page_name" id="unselectable">LIBRARY</div>
        <img class="magnifier_icon" src="/player_icons/search.svg" alt="search function" />
        <img class="remove_icon" src="/library_icons/add.svg" alt="remove collection or song"/>
        <img class="download_icon" src="/library_icons/download.svg" alt="download song" />
      </div>

      <a href = "/">
        <div class="back_button" >
          <div class="back_button_bg" ></div>
          <img class="back_button_icon" src="/library_icons/back_button.svg/" alt="back button"  />
        </div>
      </a>
    </div>

    <div class="collection_buttons">
      <button class="create_collection_button" onclick={() => collection_name()}>
      Create New Collection
      </button>
      <button class="rename_collection_button" onclick={() => rename_collection()}>
        Rename Collection
      </button>
    </div>
    <div class="library-section">
      {#each $songs as song}
      <button class="song" onclick = {togglePlay}>
        <img class="song_cover" src={song.cover ?? "/src/library/library_covers/cover_placeholder.jpg"} alt="song cover" />
        <div class="song_title">{song.title}</div>
        <div class="song_artist">{song.artist}</div>
        <div class="song_duration">{formatTime(song.duration ?? 0)}</div>
      </button>
      {/each}
    </div>
  </div>
</main>
  
<style>.library,
    .library * {
      box-sizing: border-box;
    }
    .library {
      background: #210038;
      border-radius: 20px;
      height: 300px;
      width: 600px;
      position: relative;
      
    }
    #unselectable {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }
    .page-title {
      width: 83px;
      height: 37px;
      position: absolute;
      left: 17px;
      top: 7px;
    }
    .divider {
      margin-top: -1px;
      border-style: solid;
      border-color: #ffffff;
      border-width: 1px 0 0 0;
      width: 550px;
      height: 0px;
      position: absolute;
      left: 0px;
      top: 37px;
    }
    .util_buttons{
      display: flex;
      flex-direction: row;
      gap: 5px;
      align-items: center;
      justify-content: flex-start;
      position: absolute;
      left: 89px;
      top: 8px;
    }
    .search_button{
      background: #d9d9d9;
      border-radius: 5px;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      position: relative;
    }
    .remove_button {
      background: #d9d9d9;
      border-radius: 5px;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      position: relative;
      right: auto;
    }
    .download_button {
      background: #d9d9d9;
      border-radius: 5px;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      position: relative;
      left: 5px;
    }
    .page_name {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 20px;
      font-weight: 400;
      position: absolute;
      right: 0%;
      left: 0%;
      width: 100%;
      bottom: 0%;
      top: 0%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .magnifier_icon {
      width: 15px;
      height: 15px;
      position: absolute;
      left: 91px;
      top: 10px;
    }
    .remove_icon{
      transform: rotate(45deg);
      width: 24px;
      height: 24px;
      position: absolute;
      left: 116.5px;
      top: 6px;
    }
    .download_icon {
      width: 18px;
      height: 18px;
      position: absolute;
      left: 150px;
      top: 9px;
  
    }
    .back_button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: absolute;
      left: 530px;
      top: 7px;
    }
    .back_button_bg {
      background: #d9d9d9;
      border-radius: 5px;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      position: relative;
    }
    .back_button_icon {
      margin: 0 0 0 -21px;
      display: flex;
      flex-direction: column;
      gap: 0px;
      align-items: flex-start;
      justify-content: flex-start;
      flex-shrink: 0;
      width: 24px;
      height: auto;
      position: relative;
   
    }
  .collection_buttons {
      display: flex;
      flex-direction: row;
      gap: 2px;
      align-items: flex-start;
      justify-content: flex-start;
      position: absolute;
      left: 17px;
      top: 51px;
    }
    .create_collection_button {
      z-index: 1;
      flex-shrink: 0;
      width: 128px;
      height: 18px;
      color: #000000;
      text-align: center;
      font-family: "Inder-Regular", sans-serif;
      font-size: 11px;
      position: relative;
    }
   
    .rename_collection_button {
      z-index: 1;
      flex-shrink: 0;
      width: 128px;
      height: 18px;
      color: #000000;
      text-align: center;
      font-family: "Inder-Regular", sans-serif;
      font-size: 11px;
      position: relative;
    }
    .library-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      justify-content: flex-start;
      width: 500px;
      position: absolute;
      left: 17px;
      top: 76px;
    }
    .song {
      background-color:#210038;
      padding: 0;
      border: none;
      background: none;
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
      width: 187px;
      height: 50px;
      position: relative;
    }
    .song_cover {
      border-radius: 10px;
      width: 26.74%;
      height: 100%;
      position: absolute;
      right: 73.26%;
      left: 0%;
      bottom: 0%;
      top: 0%;
      object-fit: cover;
    }
    .song_title {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 12px;
      font-weight: 400;
      position: absolute;
      right: -8.02%;
      left: 32.62%;
      width: 75.4%;
      bottom: 72%;
      top: 0%;
      height: 28%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .song_artist{
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 10px;
      font-weight: 400;
      position: absolute;
      right: 0.53%;
      left: 32.62%;
      width: 66.84%;
      bottom: 36%;
      top: 36%;
      height: 28%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .song_duration {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 10px;
      font-weight: 400;
      position: absolute;
      right: 34.22%;
      left: 32.62%;
      width: 33.16%;
      bottom: 0%;
      top: 72%;
      height: 28%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
</style>  