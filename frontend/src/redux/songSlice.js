import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
    name: 'songs',
    initialState: {
        songs: {
            allSongs: null,
            // todo
            isFetching: false,
            error: false,
            currentSong: null,
            isPlaying: false,
            duration: 0,
            currentTime: 0,
            randomBtn: false,
            repeatMode: false,
        },
    },
    reducers: {
        getSongStart: (state) => {
            state.songs.isFetching = true;
        },
        getSongSuccess: (state, action) => {
            state.songs.isFetching = false;
            state.songs.allSongs = action.payload;
        },
        getSongFailed: (state) => {
            state.songs.isFetching = false;
            state.songs.error = true;
        },
        getCurrentSongStart: (state) => {
            state.songs.isFetching = true;
        },
        getCurrentSongSuccess: (state, action) => {
            state.songs.isFetching = false;
            state.songs.currentSong = action.payload;
            state.songs.currentTime = 0;
            state.songs.duration = 0;
            state.songs.error = false;
        },
        getCurrentSongFailed: (state) => {
            state.songs.error = true;
        },
        setIsPlaying: (state, action) => {
            state.songs.isPlaying = action.payload;
        },
        setDuration: (state, action) => {
            state.songs.duration = action.payload;
        },
        setCurrentTime: (state, action) => {
            state.songs.currentTime = action.payload;
        },
        setRandomBtn: (state, action) => {
            state.songs.randomBtn = action.payload;
        },
        setRepeatMode: (state, action) => {
            state.songs.repeatMode = action.payload;
        },
    },
});

export const {
    getSongStart,
    getSongSuccess,
    getSongFailed,
    getCurrentSongStart,
    getCurrentSongSuccess,
    getCurrentSongFailed,
    setIsPlaying,
    setDuration,
    setCurrentTime,
    setRandomBtn,
    setRepeatMode,
} = songSlice.actions;
export default songSlice.reducer;
