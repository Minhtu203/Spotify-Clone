import classNames from 'classnames/bind';
import style from './ControlBar.module.scss';
import { useDispatch } from 'react-redux';
import { getArtistDetail } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { NextIcon, PauseIcon, PlayMusicIcon, PrevIcon, RandomIcon, RepeatIcon } from '../../assets/Icon';
import { Slider } from 'primereact/slider';
import { UseAudioPlayer } from '../../lib/useAudioPlayer';

const cx = classNames.bind(style);

function ControlBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        song,
        isPlaying,
        currentTime,
        duration,
        audioRef,
        togglePlayPause,
        handleSeek,
        formatTime,
        playRandomSong,
        prevSong,
    } = UseAudioPlayer();

    const handleArtist = (artistid) => {
        getArtistDetail(dispatch, navigate, artistid);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('current-song')}>
                <img className={cx('current-song-img')} alt={song.name} src={song.avatar} />
                <div className={cx('current-song-title')}>
                    <span className={cx('name')}>{song.name}</span>
                    <span className={cx('artist')} onClick={() => handleArtist(song.artist._id)}>
                        {song.artist.name}
                    </span>
                </div>
            </div>
            <div className={cx('main-control')}>
                <div className={cx('progress-bar-btn')}>
                    <button>
                        <RandomIcon className={cx('random-icon', 'icon')} />
                    </button>
                    <button onClick={prevSong}>
                        <PrevIcon className={cx('prev-icon', 'icon')} />
                    </button>

                    <audio ref={audioRef} src={song.audioUrl}></audio>
                    {!isPlaying ? (
                        <button className={cx('play-icon-btn')} onClick={() => togglePlayPause()}>
                            <PlayMusicIcon className={cx('play-icon', 'icon')} />
                        </button>
                    ) : (
                        <button className={cx('play-icon-btn')} onClick={() => togglePlayPause()}>
                            <PauseIcon className={cx('play-icon', 'icon')} />
                        </button>
                    )}
                    <button onClick={playRandomSong}>
                        <NextIcon className={cx('next-icon', 'icon')} />
                    </button>
                    <button>
                        <RepeatIcon className={cx('repeat-icon', 'icon')} />
                    </button>
                </div>
                <div className={cx('progress-bar')}>
                    <span>{formatTime(currentTime)}</span>
                    <Slider
                        className={cx('duration')}
                        min={0}
                        max={duration}
                        value={currentTime || 0}
                        onChange={(e) => handleSeek(e.value)}
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
            <div className={cx('action-right-bar')}>lyric, volume,...</div>
        </div>
    );
}

export default ControlBar;
