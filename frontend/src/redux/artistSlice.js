import { createSlice } from '@reduxjs/toolkit';

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: {
            allArtist: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getArtistStart: (state) => {
            state.artist.isFetching = true;
        },
        getArtistSuccess: (state, action) => {
            state.artist.isFetching = false;
            state.artist.allArtist = action.payload;
        },
        getArtistFailed: (state) => {
            state.artist.error = true;
        },
    },
});

export const { getArtistStart, getArtistSuccess, getArtistFailed } = artistSlice.actions;
export default artistSlice.reducer;
