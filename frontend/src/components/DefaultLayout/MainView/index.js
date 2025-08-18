import classNames from 'classnames/bind';
import style from './MainView.module.scss';

import { useEffect, useState } from 'react';
import { getAllArtist } from '../../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlayMusicIcon } from '../../../assets/Icon';

const cx = classNames.bind(style);

function MainView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const artists = useSelector((state) => state.artists.artist?.allArtist);
    const [playHover, setPlayHover] = useState(null);

    useEffect(() => {
        getAllArtist(dispatch);
    }, [dispatch]);

    const handleClick = (artistId) => {
        navigate(`/artists/${artistId}`);
    };
    const handlePlayMusic = () => {
        console.log('clicked play');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-btn')}>
                <button>All</button>
                <button>Music</button>
                <button>Podcasts</button>
            </div>
            <div className={cx('all-song')}>
                {artists.map((artist) => (
                    <div
                        key={artist._id}
                        className={cx('song-item')}
                        onClick={() => handleClick(artist._id)}
                        onMouseEnter={() => setPlayHover(artist._id)}
                        onMouseLeave={() => setPlayHover(null)}
                    >
                        <img className={cx('song-avatar')} src={artist.imageUrl} alt={artist.name}></img>
                        <span>{artist.name}</span>

                        {playHover === artist?._id && (
                            <button
                                className={cx('play-icon')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayMusic();
                                }}
                                // onMouseEnter={() => setPlayHover(artist._id)}
                                // onMouseLeave={() => setPlayHover(null)}
                            >
                                <PlayMusicIcon className={cx('icon')} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* TEST DELETE */}
            {/* <span
                style={{ width: '3rem', height: '3rem', fontSize: '2rem', marginTop: '3rem', color: 'var(--primary)' }}
            >
                Username:
            </span>
            {userData.map((u, index) => (
                <div
                    key={index + 1}
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '3rem',
                        gap: '2rem',
                    }}
                >
                    <span
                        key={u._id}
                        style={{
                            // width: '50%',
                            height: '3rem',
                            fontSize: '1.8rem',
                            color: 'white',
                        }}
                    >
                        username: {u.userName}
                    </span>
                    {(user?.admin || u._id === user?._id) && (
                        <button
                            onClick={() => handleDelete(u._id)}
                            style={{ width: '30%', height: '3rem', color: 'black' }}
                        >
                            DELETE
                        </button>
                    )}
                </div>
            ))} */}
        </div>
    );
}

export default MainView;
