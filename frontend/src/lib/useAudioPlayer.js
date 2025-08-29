import { useEffect, useContext, useState } from 'react';
import { getAllSongs, getSongById, getSongBySongId } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCurrentSongSuccess,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setRandomBtn,
    setRepeatMode,
} from '../redux/songSlice';
import { AudioContext } from './AudioContext';

export const UseAudioPlayer = () => {
    const dispatch = useDispatch();
    const [volume, setVolume] = useState(100);

    //get all songs
    const songs = useSelector((state) => state.songs?.songs?.allSongs);

    //get current song
    const song = useSelector((state) => state.songs?.songs?.currentSong);
    const isPlaying = useSelector((state) => state.songs.songs?.isPlaying);
    const duration = useSelector((state) => state.songs.songs?.duration);
    const currentTime = useSelector((state) => state.songs.songs?.currentTime);
    const randomBtn = useSelector((state) => state.songs.songs?.randomBtn);
    const repeatMode = useSelector((state) => state.songs.songs?.repeatMode);
    const [lastVolume, setLastVolume] = useState(60);

    // audio
    const audioRef = useContext(AudioContext);

    useEffect(() => {
        if (audioRef.current && song.audioUrl) {
            audioRef.current.src = song.audioUrl;
            audioRef.current.load();

            audioRef.current.onloadedmetadata = () => {
                dispatch(setDuration(audioRef.current.duration));
            };

            audioRef.current.ontimeupdate = () => {
                dispatch(setCurrentTime(audioRef.current.currentTime));
            };
            audioRef.current.onended = () => {
                if (repeatMode) {
                    repeatSong();
                    return;
                }

                if (randomBtn) {
                    playRandomSong();
                } else {
                    playNextSong();
                }
            };

            audioRef.current
                .play()
                .then(() => dispatch(setIsPlaying(true)))
                .catch((err) => console.log(err));
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                dispatch(setCurrentTime(0));
                dispatch(setDuration(0));
                dispatch(setIsPlaying(false));
            }
        }
        return () => {
            audioRef.onloadedmetadata = null;
            audioRef.ontimeupdate = null;
            audioRef.onended = null;
        };
    }, [song]);

    const handleMuteVolume = () => {
        if (volume === 0) {
            setVolume(lastVolume);
            if (audioRef.current) {
                audioRef.current.volume = lastVolume / 100;
            }
        } else {
            // mute
            setLastVolume(volume);
            setVolume(0);
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        }
    };

    const handleVolumeChange = (newVolume) => {
        // const newVolume = e / 100;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
        if (newVolume > 0) {
            setLastVolume(newVolume);
        }
    };

    const playNextSong = () => {
        const currentSong = songs.findIndex((s) => s._id === song._id);
        const nextIndex = (currentSong + 1) % songs.length;
        getSongBySongId(dispatch, songs[nextIndex]._id);
    };

    const handleSeek = (e) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = e;
        dispatch(setCurrentTime(e));
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            dispatch(setIsPlaying(false));
        } else {
            audioRef.current.play().catch((err) => console.log(err));
            dispatch(setIsPlaying(true));
        }
    };

    const playRandomSong = () => {
        if (!songs || songs.length === 0) {
            return;
        }
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (songs[randomIndex]._id === song._id);

        const randomSong = songs[randomIndex];
        getSongById(dispatch, randomSong._id);
        //auto play when next song
        setTimeout(() => {
            audioRef.current
                .play()
                .then(() => dispatch(setIsPlaying(true)))
                .catch((err) => console.log(err));
        }, 200);
    };

    const repeatSong = () => {
        dispatch(setRepeatMode(false));
        audioRef.current.currentTime = 0;
        audioRef.current
            .play()
            .then(() => dispatch(setIsPlaying(true)))
            .catch((err) => console.log(err));
    };

    const prevSong = () => {
        if (!songs || songs.length === 0) return;
        const currentIndex = songs.findIndex((s) => s._id === song._id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        getSongById(dispatch, songs[prevIndex]._id);
    };

    return {
        song,
        isPlaying,
        setIsPlaying,
        currentTime,
        duration,
        audioRef,
        togglePlayPause,
        handleSeek,
        formatTime,
        playRandomSong,
        prevSong,
        randomBtn,
        playNextSong,
        playRandomSong,
        repeatMode,
        handleVolumeChange,
        volume,
        handleMuteVolume,
    };
};
