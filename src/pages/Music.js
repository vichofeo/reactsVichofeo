import AudioPlayer from 'react-modern-audio-player';

const playList = [
  {
    name: 'name',
    writer: 'writer',
    img: "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    src: "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
    id: 1,
  },
  {
    name: 'name2',
    writer: 'writer2',
    img: "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    src: "https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3",
    id: 2,
  },
  {
    name: 'name3',
    writer: 'writer3',
    img: "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    src: "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
    id: 3,
  },
]
export default function AppMusic2 (){
	return (
		<div style={{zIndex: 2035}} className="main-footer">
      <AudioPlayer
        playList={playList}
        audioInitialState={{
          muted: false,
          volume: 0.5,
          curPlayId: 1,
          isPlaying:false
        }}
        
        placement={{
          interface: {
            templateArea: {
              trackTimeDuration: "row1-5",
              progress: "row1-4",
              playButton: "row1-6",
              repeatType: "row1-7",
              volume: "row1-8",
            },
          },
          player: "bottom-left",
        }}
        activeUI={{
          all: true,
          progress: "waveform",
          playListPlacement: "top",
        }}
      />
    </div>
	)
}



