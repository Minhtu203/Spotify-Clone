import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            err: false,
        },
        register: {
            isFetching: false,
            err: false,
            success: false,
        },
        logout: {
            isFetching: false,
            err: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.err = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.err = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.err = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.err = true;
        },
        logOutStart: (state) => {
            state.logout.isFetching = true;
            state.logout.err = false;
        },
        logOutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.err = false;
        },
        logOutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.err = true;
        },
    },
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
} = authSlice.actions;
export default authSlice.reducer;
