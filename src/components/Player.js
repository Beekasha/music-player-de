import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay, 
    faAngleLeft, 
    faAngleRight,
    faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo}) => {


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



    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration} 
                    value={songInfo.currentTime} 
                    type="range" 
                    onChange={dragHandler}
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    icon={isPlaying ? faPause : faPlay} 
                    size="2x" 
                />
                <FontAwesomeIcon className="skip-forward" icon={faAngleRight} size="2x" />
            </div>

        </div>
    )
}

export default Player;