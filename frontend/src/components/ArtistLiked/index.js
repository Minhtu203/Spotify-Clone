import classNames from 'classnames/bind';
import style from './ArtirstLiked.module.scss';
import 'primeicons/primeicons.css';
import { PinIcon } from '../../assets/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getArtistDetail, getLikedArtistDetail } from '../../redux/apiRequest';

const cx = classNames.bind(style);

function ArtirstLiked() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login?.currentUser);

    useEffect(() => {
        if (user?.liked?.artists?.length > 0) {
            user?.liked?.artists?.map((a, index) => {
                getLikedArtistDetail(dispatch, a);
            });
        }
    }, [dispatch, user?.liked?.artists]);

    const followedArtist = useSelector((state) => state.artists.artist?.likedArtists);

    const handleArtist = (artistId) => {
        getArtistDetail(dispatch, artistId);
        navigate(`/artists/${artistId}`);
    };

    return (
        <div className={cx('wrapper')}>
            <button className={cx('liked-songs')}>
                <span className={cx('heart-icon')}>
                    <i className="pi pi-heart-fill" style={{ fontSize: '1.6rem', color: 'var(--white)' }}></i>
                </span>
                <div className={cx('content')}>
                    Liked Songs
                    <div className={cx('title')}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <PinIcon />
                        </span>
                        Playlist
                        <span className={cx('dot')}></span>
                    </div>
                </div>
            </button>
            {/* map  */}
            {followedArtist?.map((a, index) => (
                <button className={cx('liked-songs')} key={index} onClick={() => handleArtist(a._id)}>
                    <img className={cx('artist-avatar')} alt={a.name} src={a.imageUrl} />
                    <div className={cx('content')}>
                        {a.name}
                        <div className={cx('title')}>Artist</div>
                    </div>
                </button>
            ))}
        </div>
    );
}

export default ArtirstLiked;
