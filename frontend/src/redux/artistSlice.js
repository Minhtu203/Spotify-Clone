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
            isFollowed: false,
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
        getLikedArtistDetailSuccess: (state, action) => {
            state.artist.isFetching = false;
            if (!Array.isArray(state.artist.likedArtists)) {
                state.artist.likedArtists = [];
            }
            const exists = state.artist.likedArtists.some((a) => a._id === action.payload._id);
            if (!exists) {
                state.artist.likedArtists.push(action.payload);
                // state.artist.isFollowed = true;
            } else {
                state.artist.likedArtists = state.artist.likedArtists.filter((a) => a._id !== action.payload._id);
                // state.artist.isFollowed = false;
            }
        },
    },
});

export const {
    getArtistStart,
    getArtistSuccess,
    getArtistFailed,
    getArtistDetailSuccess,
    getLikedArtistDetailSuccess,
} = artistSlice.actions;
export default artistSlice.reducer;
