import React, { useState, createContext, useContext, Component }  from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";

import "react-jinke-music-player/assets/index.css";



const audioList2=[]
const audioList3=[]

const audioList1 = [
  {
    name: "Despacito",
    singer: "Luis Fonsi",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    musicSrc:
      "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3"
    // support async fetch music src. eg.
    // musicSrc: async () => {
    //   return await fetch('/api')
    // },
  },
  {
    name: "Dorost Nemisham",
    singer: "Sirvan Khosravi",
    cover:
      "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
    musicSrc:
      "https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3"
  },
  {
    name: "Bedtime Stories",
    singer: "Jay Chou",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
    musicSrc:
      "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3"
  },
  {
    name: "Despacito",
    singer: "Luis Fonsi",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    musicSrc:
      "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3"
  },
  {
    name: "Bedtime Stories",
    singer: "Jay Chou",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
    musicSrc:
      "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3"
  },
  {
    name: "Dorost Nemisham",
    singer: "Sirvan Khosravi",
    cover:
      "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
    musicSrc:
      "https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3"
  }
];

const options = {
  audioLists: audioList1,
  clearPriorAudioLists: true
};

const SideMenu = () => {
  const { options, setOptions } = useContext(AppContext);

  // nit check if Sidemenu is inside AppContext - omitted here
  return (
    <div style={{ marginTop: "100px" }}>
      <h2>SideMenu</h2>
      <button
        onClick={() => setOptions({ ...options, audioLists: audioList1 })}
      >
        Playlist1
      </button>
      <button
        onClick={() => setOptions({ ...options, audioLists: audioList2 })}
      >
        Playlist2
      </button>
      <button
        onClick={() => setOptions({ ...options, audioLists: audioList3 })}
      >
        Playlist3
      </button>
    </div>
  );
};

const AppContext = createContext({
  options,
  setOptions: () => {}
});

function AppMusic2(props) {
  const [playerOptions, setPlayerOptions] = useState(options);
  const [sideBarFull] = useState(true);
  const [audio, setAudio] = useState();

  const userSettings = {
    playerOptions,
    setPlayerOptions
  };

 
  /*const getAudioInstance= (audio) => {
    const myaudio = audio
  }*/
  
  return (
    <div>
    <AppContext.Provider
      value={{ options: playerOptions, setOptions: setPlayerOptions }}
    >
      
      <button
          type="button"
          onClick={() => {
            audio.playByIndex(1)
          }}
        > primer camion</button>

      <SideMenu showFullMenu={sideBarFull} />
      <div  style={{zIndex:'1000000'}}>
              {/*<AppRoutes />*/}
              <ReactJkMusicPlayer
              getAudioInstance={(instance) => {
                console.log('instancioa', instance)
                setAudio(instance)
              }}
               {...playerOptions} style={{zIndex:'9999999999'}}/>
            </div>
    </AppContext.Provider>
    </div>
  );
}


export default AppMusic2;
