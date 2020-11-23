import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay, 
    faAngleLeft, 
    faAngleRight,
    faPause,
} from '@fortawesome/free-solid-svg-icons';
// import {playAudio} from '../util'



const Player = ({
    currentSong, 
    isPlaying, 
    setIsPlaying, 
    audioRef, 
    setSongInfo, 
    songInfo, 
    songs, 
    setCurrentSong,
    setSongs,
}) => {

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
          if (song.id === nextPrev.id) {
            return {
              ...song,
              active: true,
            };
          } else {
            return {
              ...song,
              active: false,
            };
          }
        });
    
        setSongs(newSongs);
    };

    const playAudio = (isPlaying, audioRef) => {
        if (isPlaying) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then((audio) => {
                audioRef.current.play();
              })
              .catch((error) => console.log(error));
            }
        }
    };

    //UseEffect will
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id) {
                return{
                    ...song,
                    active: true,
                };
            }else {
                return{
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong]);

    //Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };



    //Format Time
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    };

    const dragHandler = (e) => {
        console.log(e.target.value)
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    // const skipTrackHandler = (direction) => {
        
    // }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    
        //Forward BAck
        if (direction === "skip-forward") {
          await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
          activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "skip-back") {
          if ((currentIndex - 1) % songs.length === -1) {
            await setCurrentSong(songs[songs.length - 1]);
            activeLibraryHandler(songs[songs.length - 1]);
            playAudio(isPlaying, audioRef);
            return;
          }
          await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
          activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track">
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        type="range" 
                        onChange={dragHandler}
                    />
                    <div className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')} 
                    className="skip-back" 
                    icon={faAngleLeft} 
                    size="2x" 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    icon={isPlaying ? faPause : faPlay} 
                    size="2x" 
                />
                <FontAwesomeIcon 
                    className="skip-forward" 
                    icon={faAngleRight} 
                    size="2x" 
                    onClick={() => skipTrackHandler('skip-forward')}

                />
            </div>

        </div>
    )
}

export default Player;