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
import {
    getCurrentSongFailed,
    getCurrentSongStart,
    getCurrentSongSuccess,
    getSongFailed,
    getSongStart,
    getSongSuccess,
} from './songSlice';
import {
    getArtistDetailSuccess,
    getArtistFailed,
    getArtistStart,
    getArtistSuccess,
    getLikedArtistDetailSuccess,
    getUnLikedArtistDetailSuccess,
} from './artistSlice';
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getCurrentUserSuccess,
    getUserFailed,
    getUserStart,
    getUserSuccess,
} from './userSlice';
import { useSelector } from 'react-redux';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', user, { withCredentials: true });
        dispatch(loginSuccess(res.data));
        navigate('/');
        return null;
    } catch (error) {
        dispatch(loginFailed());
        return error.response?.data?.message || 'Login failed';
    }
};

export const LogOut = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        await axios.post(
            'http://localhost:5000/api/auth/logout',
            {},
            {
                withCredentials: true,
            },
        );
        dispatch(logOutSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(logOutFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:5000/api/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const getAllSongs = async (dispatch) => {
    dispatch(getSongStart());
    try {
        const res = await axios.get('http://localhost:5000/api/songs/');
        dispatch(getSongSuccess(res.data));
    } catch (error) {
        dispatch(getSongFailed());
    }
};

export const getSongById = async (dispatch, songId) => {
    dispatch(getCurrentSongStart());
    try {
        const res = await axios.get(`http://localhost:5000/api/songs/${songId}`);
        dispatch(getCurrentSongSuccess(res.data));
    } catch (error) {
        dispatch(getCurrentSongFailed());
    }
};

//get all songs by artistId
export const getAllSongById = async (dispatch, artist_id) => {
    dispatch(getSongStart());
    try {
        const res = await axios.get(`http://localhost:5000/api/songs/artist/${artist_id}`);
        dispatch(getSongSuccess(res.data));
    } catch (error) {
        dispatch(getSongFailed());
    }
};

export const getSongBySongId = async (dispatch, songId) => {
    dispatch(getCurrentSongStart());
    try {
        const res = await axios.get(`http://localhost:5000/api/songs/${songId}`);
        dispatch(getCurrentSongSuccess(res.data));
    } catch (error) {
        dispatch(getCurrentSongFailed());
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

export const getArtistDetail = async (dispatch, id) => {
    dispatch(getArtistStart());
    try {
        const res = await axios.get(`http://localhost:5000/api/artists/${id}`);
        dispatch(getArtistDetailSuccess(res.data));
    } catch (error) {
        dispatch(getArtistFailed());
    }
};

export const getLikedArtistDetail = async (dispatch, id) => {
    dispatch(getArtistStart());
    try {
        const res = await axios.get(`http://localhost:5000/api/artists/${id}`);
        dispatch(getLikedArtistDetailSuccess(res.data));
    } catch (error) {
        dispatch(getArtistFailed());
    }
};

// export const getUnLikedArtistDetail = async (dispatch, id) => {
//     dispatch(getArtistStart());
//     try {
//         const res = await axios.get(`http://localhost:5000/api/artists/${id}`);
//         dispatch(getUnLikedArtistDetailSuccess(res.data));
//     } catch (error) {
//         dispatch(getArtistFailed());
//     }
// };

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJWT.get('http://localhost:5000/api/user/', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailed());
    }
};

export const deleteUser = async (userId, dispatch, accessToken, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        await axiosJWT.delete(`http://localhost:5000/api/user/${userId}`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteUserSuccess(userId));
    } catch (err) {
        dispatch(deleteUserFailed());
    }
};
