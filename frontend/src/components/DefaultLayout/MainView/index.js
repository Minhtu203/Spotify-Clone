import classNames from 'classnames/bind';
import style from './MainView.module.scss';

import { useEffect, useState } from 'react';
import { deleteUser, getAllArtist, getAllUsers } from '../../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function MainView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const artists = useSelector((state) => state.artists.artist?.allArtist);
    const [navArtistProfile, setNavArtistProfile] = useState(null);

    useEffect(() => {
        getAllArtist(dispatch);
    }, [dispatch]);

    const handleClick = (artistId) => {
        setNavArtistProfile(artistId);
        navigate(`/artist/${artistId}`);
    };

    // TEST DELETE
    // const user = useSelector((state) => state.auth.login?.currentUser);
    // const userData = useSelector((state) => state.users.users?.allUser);

    // useEffect(() => {
    //     getAllUsers(user?.accessToken, dispatch, axiosJWT);
    // }, [user?.accessToken, dispatch, axiosJWT]);

    // const handleDelete = (id) => {
    //     if (user?.admin) {
    //         // admin thì xóa bất kỳ user nào
    //         deleteUser(id, dispatch, navigate, user?.accessToken, axiosJWT);
    //     } else {
    //         // user thường thì chỉ được xóa chính mình
    //         if (id === user?._id) {
    //             deleteUser(id, dispatch, navigate, user?.accessToken, axiosJWT);
    //         } else {
    //             alert('Bạn không có quyền xóa user này!');
    //         }
    //     }
    // };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-btn')}>
                <button>All</button>
                <button>Music</button>
                <button>Podcasts</button>
            </div>

            <div className={cx('all-song')}>
                {artists.map((artist) => (
                    <div key={artist._id} className={cx('song-item')} onClick={() => handleClick(artist._id)}>
                        <img className={cx('song-avatar')} src={artist.imageUrl} alt={artist.name}></img>
                        <span>{artist.name}</span>
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
