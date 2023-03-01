import AudioPlayer from "react-modern-audio-player"

const InputPlayMusic = ({ nameArtist, writer, avatar, music }) => {
    const playList = [
        {
            name: nameArtist,
            writer: writer,
            img: avatar,
            src: music ? music : "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
            id: 1,
        },

    ]
    const play = music ? true : false
    return (
        <div className="row">
            <div style={{ zIndex: 2035 }} className="main-footer">

                <AudioPlayer
                    playList={playList}
                    audioInitialState={{
                        muted: false,
                        volume: 0.5,
                        curPlayId: 1,
                        isPlaying: play
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


        </div>
    )
}

export default InputPlayMusic