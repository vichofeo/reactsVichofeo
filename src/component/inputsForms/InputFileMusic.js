import AudioPlayer from "react-modern-audio-player"

const InputFileMusic = ({ label, idx, nameArtist, writer, avatar, music, fileName, ...restoProps }) => {
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
            <div className="col-md-6">
                <div className="avatar-box">

                    <label
                        htmlFor={idx}
                        className="select-avatar"
                    >
                        <i
                            className={`fa fa-music fa-2x`}
                            aria-hidden="true"
                            style={{ color: "Tomato" }}
                        ></i>
                        <p>{label}</p>
                    </label>
                    <input
                        className=""
                        type="file"
                        id={idx}
                        {...restoProps}
                    />
                </div>
            </div>
            <div className="col-md-6">
{fileName ?  fileName: null}
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

        </div>
    )
}

export default InputFileMusic