import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';

import ArtirstLiked from '../../ArtistLiked';
import { useEffect, useRef, useState } from 'react';
import { ExpandIcon, ListIcon, PlusIcon, SearchIcon } from '../../../assets/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistDetail } from '../../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const width = useState(400);
    const [searchToggle, setSearchToggle] = useState(false);
    const [result, setResult] = useState([]);
    const [inputValue, setInputValue] = useState(''); // input search
    const inputRef = useRef(null);
    let followedArtist = useSelector((state) => state.artists.artist?.likedArtists); // get array likeArtists from artistSlice

    useEffect(() => {
        inputRef.current?.focus();
    }, [searchToggle]);

    // Hàm chuẩn hóa chuỗi (bỏ dấu + lowercase)
    const normalizeText = (str) =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    useEffect(() => {
        if (!inputValue.trim()) {
            setResult([]);
            return;
        }
        const filtered = followedArtist.filter((artist) =>
            normalizeText(artist.name).includes(normalizeText(inputValue)),
        );
        setResult(filtered);
    }, [inputValue, followedArtist]);

    const handleArtist = (artistId) => {
        getArtistDetail(dispatch, artistId);
        navigate(`/artists/${artistId}`);
    };

    return (
        <div className={cx('wrapper', { shink: width < 150 })} style={{ width: `${width}px` }}>
            <div className={cx('header')}>
                <div className={cx('header-title')}>
                    <span className={cx('library')}>Your Library</span>
                    <div className={cx('create-container')}>
                        <div className={cx('create-btn')}>
                            <span>
                                <PlusIcon />
                            </span>
                            <span className={cx('create-title')}>Create</span>
                        </div>

                        <button className={cx('expand-btn')}>
                            <ExpandIcon />
                        </button>
                    </div>
                </div>

                <div className={cx('header-btn')}>
                    <button className={cx('res-hide')}>Playlists</button>
                    <button className={cx('res-hide')}>Artists</button>
                    <button className={cx('res-hide')}>Albums</button>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('search-recent-icon')}>
                    {!searchToggle ? (
                        <button
                            className={cx('search-content-icon')}
                            onClick={() => {
                                setSearchToggle(true);
                            }}
                        >
                            <SearchIcon className={cx('search-icon')} width="1.8rem" height="1.8rem" />
                        </button>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <input
                                className={cx('search-input', { open: searchToggle, close: !searchToggle })}
                                onFocus={() => setSearchToggle(true)}
                                onBlur={() => setSearchToggle(false)}
                                ref={inputRef}
                                spellCheck="false"
                                placeholder="Search in Your Library"
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button className={cx('input-search-content-icon')} onClick={() => setSearchToggle(false)}>
                                <SearchIcon className={cx('search-icon')} width="1.8rem" height="1.8rem" />
                            </button>
                        </div>
                    )}
                    <button className={cx('recent-btn')}>
                        <span className={cx('recent-title')}>Recents</span>
                        <span className={cx('list-icon')} style={{ marginLeft: '0.8rem' }}>
                            <ListIcon />
                        </span>
                    </button>
                </div>

                {inputValue.length <= 0 && (
                    <div className={cx('content-list')}>
                        <ArtirstLiked />
                    </div>
                )}

                {result &&
                    result.map((a, index) => (
                        <div className={cx('search-wrapper')} key={a._id}>
                            <button className={cx('liked-songs')} key={index} onClick={() => handleArtist(a._id)}>
                                <img className={cx('artist-avatar')} alt={a.name} src={a.imageUrl} />
                                <div className={cx('content')}>
                                    {a.name}
                                    <div className={cx('title')}>Artist</div>
                                </div>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Sidebar;
