import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { BrowseIcon, HomeIcon, SearchIcon, SpotifyIcon } from '../../../assets/Icon';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllSongs, LogOut } from '../../../redux/apiRequest';
import { CreateAxios } from '../../../createAxios';
import { logOutSuccess } from '../../../redux/authSlice';

const cx = classNames.bind(styles);

export default function Header() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [searchIcon, setSearchIcon] = useState(false);

    //api all users
    const user = useSelector((state) => state.users.users?.allUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;

    let axiosJWT = CreateAxios(user, dispatch, logOutSuccess);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const Songs = useSelector((state) => state.songs.songs?.allSongs);
    useEffect(() => {
        getAllSongs(dispatch);
    }, [dispatch]);

    const handleLogOut = () => {
        LogOut(userId, dispatch, accessToken, axiosJWT);
    };

    const navigate = useNavigate();

    return (
        <div className={cx('header-wrapper')}>
            <span className={cx('logo')}>
                <SpotifyIcon />
            </span>

            <div className={cx('search-container')}>
                <button className={cx('home-btn')} style={{ position: 'relative' }}>
                    <HomeIcon />
                </button>
                <div className={cx('search-container-sub')}>
                    {/* thanh tim kiem */}
                    <div className={cx('search-input-container')}>
                        <span className={cx('search-icon')} style={{ height: '100%' }} onClick={handleFocus}>
                            {/* click -> toggle color */}
                            <SearchIcon className={cx('search-icon2', { active: isFocus || inputValue })} />
                        </span>

                        <span
                            className={cx('search-input-wrapper')}
                            onMouseEnter={() => setSearchIcon(true)}
                            onMouseLeave={() => setSearchIcon(false)}
                        >
                            <input
                                className={cx('search-input')}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                ref={inputRef}
                                spellCheck="false"
                                placeholder="What do you want to play?"
                                onChange={(e) => setInputValue(e.target.value)}
                            />

                            <div className={cx('show-search-box', { hide: !(searchIcon && inputValue.trim() === '') })}>
                                <span className={cx('search-input-sub1')}>
                                    <kbd>Ctrl</kbd>
                                </span>
                                <span className={cx('search-input-sub2')}>
                                    <kbd>K</kbd>
                                </span>
                            </div>
                        </span>

                        <button className={cx('browse-icon-btn', { active: searchIcon })}>
                            <BrowseIcon className={cx('browse-icon')} />
                        </button>
                    </div>

                    {isFocus && (
                        <div className={cx('search-result')}>
                            <span className={cx('recent-search')}>Recent searches</span>

                            <ul className={cx('song-list')}>
                                {Songs?.map((song) => (
                                    <li key={song._id} className={cx('song-item')}>
                                        <img src={song.avatar} alt="song pic" />
                                        <div>
                                            <span>{song.name || 'Undefined'}</span>
                                            <span>{song.artist?.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* <button onClick={() => handleDeleteUser()}>asdfasdf</button> */}

            <button className={cx('logout-btn')} onClick={() => handleLogOut()}>
                Log out
            </button>
        </div>
    );
}
