import classNames from 'classnames/bind';
import style from './ControlBar.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongBySongId } from '../../redux/apiRequest';

const cx = classNames.bind(style);

function ControlBar() {
    const dispatch = useDispatch();

    //get song
    // const song = useSelector((state) => state.songs.currentSong?.song);

    // useEffect(() => {
    //     getSongBySongId(dispatch, song._id);
    // }, [dispatch, song._id]);
    // console.log(song);

    // const [isPlaying, setIsPlaying] = useState(false);
    // const audioRef = useRef(new Audio());

    return (
        <div className={cx('wrapper')}>
            <div className={cx('current-song')}></div>
            <div className={cx('main-control')}>
                <div className={cx('progress-bar-btn')}></div>
                <div className={cx('progress-bar')}>duration</div>
            </div>
            <div className={cx('action-right-bar')}>lyric, volume,...</div>
        </div>
    );
}

export default ControlBar;
