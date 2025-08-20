import { createSlice } from '@reduxjs/toolkit';

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: {
            allArtist: [],
            isFetching: false,
            error: false,
            artistDetail: null,
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
        getArtistDetailSuccess: (state, action) => {
            state.artist.isFetching = false;
            state.artist.artistDetail = action.payload;
        },
    },
});

export const { getArtistStart, getArtistSuccess, getArtistFailed, getArtistDetailSuccess } = artistSlice.actions;
export default artistSlice.reducer;
