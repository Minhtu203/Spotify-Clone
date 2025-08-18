import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
    name: 'song',
    initialState: {
        songs: {
            allSongs: null,
            isFetching: false,
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
    },
});

export const { getSongStart, getSongSuccess, getSongFailed } = songSlice.actions;
export default songSlice.reducer;
