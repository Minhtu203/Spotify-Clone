import classNames from 'classnames/bind';
import style from './ArtistDetail.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AddIcon, ListIcon, PlayMusicIcon, VerifiedIcon } from '../../assets/Icon';
import { FollowButton } from '../FollowButton';
import 'primeicons/primeicons.css';
import { Fragment, useEffect, useState } from 'react';
import { getAllSongById, getArtistDetail } from '../../redux/apiRequest';

const cx = classNames.bind(style);

function ArtistDetail() {
    const [playInSongItem, setPlayInSongItem] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getArtistDetail(dispatch, id);
    }, [dispatch, id]);
    const artist = useSelector((state) => state.artists.artist?.artistDetail);

    //call api get songs by artist id
    useEffect(() => {
        getAllSongById(dispatch, id);
    }, [dispatch, id]);
    const songs = useSelector((state) => state.songs.songs?.allSongs);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('content-bio')}>
                    <img className={cx('artist-coverpic')} alt={artist?.name} src={artist?.coverUrl} />
                    <div className={cx('content-title')}>
                        <div className={cx('verified')}>
                            <span style={{ color: '#4cb3ff' }}>
                                <VerifiedIcon />
                            </span>
                            <span>Verified Artist</span>
                        </div>
                        <span className={cx('artist-name')}>{artist.name}</span>
                    </div>
                </div>
                <div style={{ padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className={cx('action-btn')}>
                        <button className={cx('play-btn')}>
                            <PlayMusicIcon style={{ width: '2rem', height: '2rem' }} />
                        </button>
                        <div className={cx('album')}>
                            <img alt={artist.name} src={artist.imageUrl} />
                        </div>
                        <span>
                            <FollowButton height="3rem" />
                        </span>
                        <i className={cx('ellipsis-icon', 'pi pi-ellipsis-h')}></i>
                    </div>
                    <span className={cx('popular')}>Popular</span>
                    <div className={cx('songs')}>
                        {songs?.map((song, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx('song-items')}
                                    onMouseEnter={() => setPlayInSongItem(song._id)}
                                    onMouseLeave={() => setPlayInSongItem(null)}
                                >
                                    <div className={cx('stt-img')}>
                                        {playInSongItem === song._id ? (
                                            <span style={{ width: '2rem' }}>
                                                <PlayMusicIcon className={cx('play-icon')} />
                                            </span>
                                        ) : (
                                            <div className={cx('stt')}>{index + 1}</div>
                                        )}

                                        <img className={cx('song-img')} alt={song.name} src={song.avatar} />
                                    </div>
                                    <div className={cx('song-name')}>
                                        {/* <a href={'/track/' + song._id}>{song.name}</a> */}
                                        <a href="/">{song.name}</a>
                                    </div>
                                    <span>
                                        {typeof song.plays === 'number'
                                            ? song.plays.toLocaleString('en-US')
                                            : 'undefined'}
                                    </span>
                                    {/* add to playlist */}

                                    <button className={cx('add-icon')}>
                                        {
                                            // playInSongItem === song._id
                                            1 ? <AddIcon className={cx('add-icon-btn')} /> : <Fragment />
                                        }
                                    </button>
                                    <span className={cx('duration')}>2:45</span>
                                    <button className={cx('list-icon-btn')}>
                                        <i className={cx('list-icon', 'pi pi-ellipsis-h')}></i>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistDetail;
