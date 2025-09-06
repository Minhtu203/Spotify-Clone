import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { BrowseIcon, HomeIcon, SearchIcon, SpotifyIcon } from '../../../assets/Icon';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, searchApi } from '../../../redux/apiRequest';
import { useSongState } from '../../../store';

const cx = classNames.bind(styles);

export default function Header() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [result, setResults] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [searchIcon, setSearchIcon] = useState(false);
    const [inputValue, setInputValue] = useState(''); // input search

    const { setUpdate } = useSongState();

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const handleLogOut = () => {
        LogOut(dispatch, navigate);
    };

    //api search songs
    useEffect(() => {
        const handler = setTimeout(async () => {
            searchApi(inputValue, setResults);
        }, 300);
        return () => clearTimeout(handler);
    }, [inputValue]);

    return (
        <div className={cx('header-wrapper')}>
            <Link to="/" alt="spotify" className={cx('logo')}>
                <SpotifyIcon />
            </Link>

            <div className={cx('search-container')}>
                <Link to="/" alt="home" className={cx('home-btn')} style={{ position: 'relative' }}>
                    <HomeIcon />
                </Link>
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
                                {result?.map((song) => (
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
            <button
                className={cx('upload-btn')}
                onClick={() => {
                    navigate('/');
                    setUpdate();
                }}
            >
                Upload
            </button>
            <button className={cx('logout-btn')} onClick={() => handleLogOut()}>
                Log out
            </button>
        </div>
    );
}
