import { useState, useRef, useEffect } from 'react';
import { getSongById } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

export const UseAudioPlayer = (song) => {
    const dispatch = useDispatch();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // audio
    const audioRef = useRef(new Audio());
    useEffect(() => {
        if (song && song.audioUrl) {
            audioRef.current.src = song.audioUrl;
            audioRef.current.load();

            audioRef.current.onloadedmetadata = () => {
                setDuration(audioRef.current.duration);
            };
            audioRef.current
                .play()
                .catch((err) => console.log(err))
                .then(() => setIsPlaying(true));

            audioRef.current.ontimeupdate = () => {
                setCurrentTime(audioRef.current.currentTime);
            };
            audioRef.current.onended = () => {
                playRandomSong();
            };
        }
    }, [song]);

    const handleSeek = (e) => {
        audioRef.current.currentTime = e;
        setCurrentTime(e);
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
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play().catch((err) => console.log(err));
            setIsPlaying(!isPlaying);
        }
    };

    //get all songs
    const songs = useSelector((state) => state.songs?.songs?.allSongs);
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
                .then(() => setIsPlaying(true))
                .catch((err) => console.log('Play error:', err));
        }, 200);
    };

    const prevSong = () => {
        if (!songs || songs.length === 0) {
            return;
        }
        const currentIndex = songs.findIndex((s) => s._id === song._id);
    };

    return {
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
