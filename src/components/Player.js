import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay, 
    faAngleLeft, 
    faAngleRight,
    faPause,
} from '@fortawesome/free-solid-svg-icons';

import { playAudio } from "../helpers"

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
    console.log("hitting activeLibraryHandler")
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


    //UseEffect will
    // useEffect(() => {
    // }, [currentSong]);

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
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

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

    //Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        type="range" 
                        onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"></div>
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