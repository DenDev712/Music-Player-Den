
<script lang="ts">
  import { invoke } from '@tauri-apps/api/core';
  async function collection_name() {
    //need this name so we can use it on rust for the create_dir path name
    const collection_name : string | null= prompt("Enter the collection name");
    if(!collection_name)return;

    try{
      await invoke('create_song_directory', {name : collection_name});
    }catch (err){
      console.error('create song directory func not working', err);
    }
  }

  async function rename_collection() {
    const rename_name: string | null = prompt("Enter the new name");
    if(!rename_name) return;

    try{
      await invoke('rename_song_directory', {name: rename_name});
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
        <img class="add_icon" src="/library_icons/add.svg" alt="add collection"/>
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
      <button class="create_collection_button" on:click={() => collection_name()}>
      Create New Collection
      </button>
      <button class="rename_collection_button" on:click={() => rename_collection()}>
        Rename Collection
      </button>
    </div>
    <div class="library-section">
      <img class="line-2" src="line-20.svg" />
      <div class="song-1">
        <img class="song_cover" src="thesmiths0.png" alt="song cover" />
        <div class="song_title">Bigmouth Strikes Again</div>
        <div class="song_artist">The Smiths</div>
        <div class="song_duration">3:11</div>
      </div>
      <img class="line-3" src="line-30.svg" />
      <div class="song-2">
        <img class="macdemarco" src="macdemarco0.png" />
        <div class="a-heart-like-hers">A Heart Like Hers</div>
        <div class="mac-demarco">Mac Demarco</div>
        <div class="_4-01">4:01</div>
      </div>
      <img class="line-4" src="line-40.svg" />
      <div class="collection-1">
        <img class="tame-impala-1" src="tame-impala-10.png" />
        <div class="bangerssssss">BANGERSSSSSS</div>
        <div class="_20-songs">20 Songs</div>
      </div>
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
      gap: 13px;
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
    .add_button{
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
    }
    .download_button {
      background: #d9d9d9;
      border-radius: 5px;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      position: relative;
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
    .add_icon {
      width: 24px;
      height: 24px;
      position: absolute;
      left: 120px;
      top: 6px;

    }
  
    .remove_icon{
      transform: rotate(45deg);
      width: 24px;
      height: 24px;
      position: absolute;
      left: 153px;
      top: 6px;
  
    }
    .download_icon {
      width: 18px;
      height: 18px;
      position: absolute;
      left: 189px;
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
    .line-2 {
      flex-shrink: 0;
      width: 550px;
      height: 0px;
      position: relative;
      
    }
    .song-1 {
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
    .line-3 {
      flex-shrink: 0;
      width: 550px;
      height: 0px;
      position: relative;
      
    }
    .song-2 {
      flex-shrink: 0;
      width: 182px;
      height: 50px;
      position: relative;
    }
    .macdemarco {
      border-radius: 10px;
      width: 27.47%;
      height: 100%;
      position: absolute;
      right: 72.53%;
      left: 0%;
      bottom: 0%;
      top: 0%;
      object-fit: cover;
    }
    .a-heart-like-hers {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 12px;
      font-weight: 400;
      position: absolute;
      right: 0%;
      left: 34.07%;
      width: 65.93%;
      bottom: 72%;
      top: 0%;
      height: 28%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .mac-demarco {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 10px;
      font-weight: 400;
      position: absolute;
      right: 7.14%;
      left: 34.07%;
      width: 58.79%;
      bottom: 34%;
      top: 36%;
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    ._4-01 {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 10px;
      font-weight: 400;
      position: absolute;
      right: 34.62%;
      left: 34.07%;
      width: 31.32%;
      bottom: 2%;
      top: 78%;
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .line-4 {
      flex-shrink: 0;
      width: 550px;
      height: 0px;
      position: relative;
 
    }
    .collection-1 {
      flex-shrink: 0;
      width: 182px;
      height: 50px;
      position: relative;
    }
    .tame-impala-1 {
      border-radius: 10px;
      width: 27.47%;
      height: 50px;
      position: absolute;
      right: 72.53%;
      left: 0%;
      top: 0px;
      object-fit: cover;
      aspect-ratio: 1;
    }
    .bangerssssss {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 12px;
      font-weight: 400;
      position: absolute;
      right: 0%;
      left: 34.07%;
      width: 65.93%;
      bottom: 66%;
      top: 0%;
      height: 34%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    ._20-songs {
      color: #ffffff;
      text-align: left;
      font-family: "Inder-Regular", sans-serif;
      font-size: 10px;
      font-weight: 400;
      position: absolute;
      right: 30.77%;
      left: 34.07%;
      width: 35.16%;
      bottom: 26%;
      top: 48%;
      height: 26%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    
</style>  