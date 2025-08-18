import Header from '../../components/DefaultLayout/Header';
import Sidebar from '../../components/DefaultLayout/Sidebar';
import ControlBar from '../../components/ControlBar';
import MainView from '../../components/DefaultLayout/MainView';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import RightActionBar from '../../components/DefaultLayout/RightActionBar';
import ArtistDetail from '../../components/ArtistDetail';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { CreateAxios } from '../../createAxios';

const cx = classNames.bind(style);

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    let axiosJWT = CreateAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (!user) {
            alert('Bạn cần đăng nhập trước');
            navigate('/login');
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                <Sidebar />
                {/* <Routes>
                        <Route path="/" element={<MainView />} />
                        <Route path="/artist/:id" element={<ArtistDetail />} />
            </Routes> */}
                <MainView />

                <RightActionBar />
            </div>
            <ControlBar />
        </div>
    );
}
