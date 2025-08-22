import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
    name: 'songs',
    initialState: {
        songs: {
            allSongs: null,
            isFetching: false,
            error: false,
        },
        currentSong: {
            isFetching: false,
            song: null,
            error: false,
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
            state.currentSong.isFetching = true;
            state.currentSong.error = false;
        },
        getCurrentSongSuccess: (state, action) => {
            state.currentSong.isFetching = false;
            state.currentSong.song = action.payload;
            state.currentSong.error = false;
        },
        getCurrentSongFailed: (state) => {
            state.currentSong.isFetching = false;
            state.currentSong.error = true;
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
} = songSlice.actions;
export default songSlice.reducer;
