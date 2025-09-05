import classNames from 'classnames/bind';
import style from './MainView.module.scss';

import { useEffect, useState } from 'react';
import { getAllArtist, getArtistDetail } from '../../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PlayMusicIcon } from '../../../assets/Icon';
import { getSongSuccess } from '../../../redux/songSlice';
import { getArtistDetailSuccess } from '../../../redux/artistSlice';
import Upload from '../../Upload/upload';
import { useSongState } from '../../../store/songStore';

const cx = classNames.bind(style);

function MainView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [playHover, setPlayHover] = useState(null);

    const { toggleUpdate } = useSongState();

    const artists = useSelector((state) => state.artists.artist?.allArtist);
    useEffect(() => {
        getAllArtist(dispatch, navigate);
    }, [dispatch, navigate]);

    const handleArtist = (artistId) => {
        getArtistDetail(dispatch, artistId);
        navigate(`/artists/${artistId}`);
    };
    const handlePlayMusic = () => {
        console.log('handlePlayMusic');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-btn')}>
                <button>All</button>
                <button>Music</button>
                <button>Podcasts</button>
            </div>
            <div className={cx('all-song')}>
                {Array.isArray(artists) &&
                    artists.map((artist) => (
                        <div
                            key={artist._id}
                            className={cx('song-item')}
                            onClick={() => handleArtist(artist._id)}
                            onMouseEnter={() => setPlayHover(artist._id)}
                            onMouseLeave={() => setPlayHover(null)}
                        >
                            <img className={cx('song-avatar')} src={artist.imageUrl} alt={artist.name}></img>
                            <span style={{ fontWeight: 700, fontSize: '1.4rem' }}>{artist.name}</span>

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

            {toggleUpdate && (
                <div className={cx('upload')}>
                    <Upload />
                </div>
            )}
        </div>
    );
}

export default MainView;
