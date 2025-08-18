import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUser: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isFetching = true;
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUser = action.payload;
        },
        getUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true;
            console.log('start');
        },
        deleteUserSuccess: (state, action) => {
            console.log(11111);

            state.users.isFetching = false;
            state.users.allUser = state.users.allUser.filter((user) => user._id !== action.payload);
        },
        deleteUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
    },
});

export const { getUserStart, getUserSuccess, getUserFailed, deleteUserStart, deleteUserSuccess, deleteUserFailed } =
    userSlice.actions;
export default userSlice.reducer;
