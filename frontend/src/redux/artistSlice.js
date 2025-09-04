import { createSlice } from '@reduxjs/toolkit';

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: {
            allArtist: [],
            isFetching: false,
            error: false,
            artistDetail: null,
            likedArtists: [],
        },
    },
    reducers: {
        getArtistStart: (state) => {
            state.artist.isFetching = true;
        },
        getArtistSuccess: (state, action) => {
            state.artist.isFetching = false;
            state.artist.allArtist = action.payload || [];
        },
        getArtistFailed: (state) => {
            state.artist.error = true;
        },
        getArtistDetailSuccess: (state, action) => {
            state.artist.isFetching = false;
            state.artist.artistDetail = action.payload;
        },
        resetLikedArtists: (state) => {
            state.artist.likedArtists = [];
        },
        likeArtist: (state, action) => {
            state.artist.isFetching = false;
            // if (!Array.isArray(state.artist.likedArtists)) {
            //     state.artist.likedArtists = [];
            // }
            // const exists = state.artist.likedArtists.some((a) => a._id === action.payload._id);
            // if (!exists) {
            state.artist.likedArtists = [...state.artist.likedArtists, action.payload];
            // }
        },
        unlikeArtist: (state, action) => {
            state.artist.likedArtists = state.artist.likedArtists.filter((a) => a._id !== action.payload._id);
        },
    },
});

export const {
    getArtistStart,
    getArtistSuccess,
    getArtistFailed,
    getArtistDetailSuccess,
    resetLikedArtists,
    likeArtist,
    unlikeArtist,
    setFollow,
    // UnLikedArtistDetail,
} = artistSlice.actions;
export default artistSlice.reducer;
