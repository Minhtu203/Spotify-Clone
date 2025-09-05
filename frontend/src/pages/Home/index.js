import Header from '../../components/DefaultLayout/Header';
import Sidebar from '../../components/DefaultLayout/Sidebar';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import RightActionBar from '../../components/DefaultLayout/RightActionBar';

import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { CreateAxios } from '../../createAxios';
import ControlBar from '../../components/ControlBar';
import { UseAudioPlayer } from '../../lib/useAudioPlayer';

const cx = classNames.bind(style);

export default function Home() {
    const { togglePlayPause, isPlaying } = UseAudioPlayer();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    let axiosJWT = CreateAxios(user, dispatch, loginSuccess);

    // space pause/play music
    useEffect(() => {
        if (!user) {
            alert('Move to login page!');
            navigate('/login', { replace: true });
        } else if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, [user, user?.accessToken, dispatch, navigate, axiosJWT]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                <Sidebar />
                <Outlet />
                <RightActionBar />
            </div>
            <ControlBar />
        </div>
    );
}
