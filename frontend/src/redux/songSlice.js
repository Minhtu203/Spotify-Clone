import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
    name: 'songs',
    initialState: {
        songs: {
            allSongs: null,
            isFetching: false,
            error: false,
            currentSong: null,
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
            state.songs.error = false;
        },
        getCurrentSongFailed: (state) => {
            state.songs.error = true;
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
