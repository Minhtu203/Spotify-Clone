import classNames from 'classnames/bind';
import style from './ArtirstLiked.module.scss';
import 'primeicons/primeicons.css';
import { PinIcon } from '../../assets/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { AddLikedArtist, getArtistDetail } from '../../redux/apiRequest';
import { resetLikedArtists } from '../../redux/artistSlice';

const cx = classNames.bind(style);

function ArtirstLiked() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser); // currentUser

    //artistLiked =  user.liked.artists
    const artistLiked = useMemo(() => {
        return Array.isArray(user?.liked?.artists) ? user.liked.artists : [];
    }, [user]);

    useEffect(() => {
        if (artistLiked.length > 0) {
            dispatch(resetLikedArtists());
            artistLiked.forEach((a) => {
                AddLikedArtist(dispatch, user._id, a);
            });
        }
    }, [dispatch, user, artistLiked]);

    let followedArtist = useSelector((state) => state.artists.artist?.likedArtists); // get array likeArtists from artistSlice

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
