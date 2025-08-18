import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerSuccess,
} from './authSlice';
import { registerStart } from '../redux/authSlice';
import { getSongFailed, getSongStart, getSongSuccess } from './songSlice';
import { getArtistFailed, getArtistStart, getArtistSuccess } from './artistSlice';
import {
    allUserFailed,
    allUserStart,
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getUserFailed,
    getUserStart,
    getUserSuccess,
} from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
        return error.response?.data?.message || 'Login failed';
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const getAllSongs = async (dispatch, navigate) => {
    dispatch(getSongStart());
    try {
        const res = await axios.get('http://localhost:5000/api/songs/');
        dispatch(getSongSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(getSongFailed());
    }
};

export const getAllArtist = async (dispatch, navigate) => {
    dispatch(getArtistStart());
    try {
        const res = await axios.get('http://localhost:5000/api/artists/');
        dispatch(getArtistSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(getArtistFailed());
    }
};

export const LogOut = async (userId, dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        const res = await axiosJWT.post('http://localhost:5000/api/auth/logout', userId, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logOutSuccess());
    } catch (error) {
        dispatch(logOutFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJWT.get('http://localhost:5000/api/user/', {
            headers: { token: `Bearer: ${accessToken}` },
        });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailed());
    }
};

export const deleteUser = async (userId, dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete(`http://localhost:5000/api/user/${userId}`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        console.log(res.data);

        dispatch(deleteUserSuccess(userId));
    } catch (err) {
        dispatch(deleteUserFailed());
    }
};
