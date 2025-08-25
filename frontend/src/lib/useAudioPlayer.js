import { useEffect, useContext } from 'react';
import { getSongById } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSongSuccess, setCurrentTime, setDuration, setIsPlaying } from '../redux/songSlice';
import { AudioContext } from './AudioContext';

export const UseAudioPlayer = () => {
    const dispatch = useDispatch();

    //get all songs
    const songs = useSelector((state) => state.songs?.songs?.allSongs);

    //get current song
    const song = useSelector((state) => state.songs?.songs?.currentSong);
    const isPlaying = useSelector((state) => state.songs.songs?.isPlaying);
    const duration = useSelector((state) => state.songs.songs?.duration);
    const currentTime = useSelector((state) => state.songs.songs?.currentTime);

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
                playRandomSong();
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
        // return () => {
        //     audioRef.onloadedmetadata = null;
        //     audioRef.ontimeupdate = null;
        //     audioRef.onended = null;
        // };
    }, [song]);

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
                .catch((err) => console.log('Play error:', err));
        }, 200);
    };

    const prevSong = () => {
        if (!songs || songs.length === 0) return;
        const currentIndex = songs.findIndex((s) => s._id === song._id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        getSongById(songs[prevIndex]);
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
    };
};
