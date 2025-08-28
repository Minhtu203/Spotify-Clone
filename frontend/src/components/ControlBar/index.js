import classNames from 'classnames/bind';
import style from './ControlBar.module.scss';
import { useDispatch } from 'react-redux';
import { getArtistDetail } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import {
    DeviceIcon,
    FullScreenIcon,
    MicroIcon,
    MiniPlayerIcon,
    NextIcon,
    NowPlayingIcon,
    PauseIcon,
    PlayMusicIcon,
    PrevIcon,
    QueueIcon,
    RandomIcon,
    RepeatIcon,
    VolumeIcon,
} from '../../assets/Icon';
import { Slider } from 'primereact/slider';
import { UseAudioPlayer } from '../../lib/useAudioPlayer';
import { setRandomBtn, setRepeatMode } from '../../redux/songSlice';

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
        prevSong,
        playNextSong,
        playRandomSong,
        randomBtn,
        repeatMode,
        handleVolumeChange,
        volume,
        handleMuteVolume,
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
                    <button
                        onClick={() => {
                            dispatch(setRepeatMode(false));
                            dispatch(setRandomBtn(!randomBtn));
                        }}
                    >
                        <RandomIcon
                            style={{ color: randomBtn ? 'var(--primary)' : 'var(--white)' }}
                            className={cx('random-icon', 'icon')}
                        />
                    </button>

                    <button onClick={prevSong}>
                        <PrevIcon className={cx('prev-icon', 'icon')} />
                    </button>

                    {/* <audio ref={audioRef} src={song.audioUrl}></audio> */}
                    {!isPlaying ? (
                        <button className={cx('play-icon-btn')} onClick={() => togglePlayPause()}>
                            <PlayMusicIcon className={cx('play-icon', 'icon')} />
                        </button>
                    ) : (
                        <button className={cx('play-icon-btn')} onClick={() => togglePlayPause()}>
                            <PauseIcon className={cx('play-icon', 'icon')} />
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (randomBtn) {
                                playRandomSong();
                            } else {
                                playNextSong();
                            }
                        }}
                    >
                        <NextIcon className={cx('next-icon', 'icon')} />
                    </button>
                    <button
                        onClick={() => {
                            dispatch(setRandomBtn(false));
                            dispatch(setRepeatMode(!repeatMode));
                        }}
                    >
                        <RepeatIcon
                            className={cx('repeat-icon', 'icon')}
                            style={{ color: repeatMode ? 'var(--primary)' : 'var(--gray)' }}
                        />
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
            <div className={cx('action-right-bar')}>
                <button className={cx('right-action-bar-btn')} onClick={() => console.log(11111)}>
                    <NowPlayingIcon className={cx('right-action-bar-icon')} />
                </button>
                <button className={cx('right-action-bar-btn')} onClick={() => console.log(11111)}>
                    <MicroIcon className={cx('right-action-bar-icon')} />
                </button>
                <button className={cx('right-action-bar-btn')} onClick={() => console.log(11111)}>
                    <QueueIcon className={cx('right-action-bar-icon')} />
                </button>
                <button className={cx('right-action-bar-btn')} onClick={() => console.log(11111)}>
                    <DeviceIcon className={cx('right-action-bar-icon')} />
                </button>

                <div className={cx('volume-container')}>
                    <button className={cx('right-action-bar-btn')} onClick={handleMuteVolume}>
                        <VolumeIcon className={cx('right-action-bar-icon')} />
                    </button>
                    {/* thanh volume */}
                    <Slider
                        className={cx('volume')}
                        value={volume * 100}
                        onChange={(e) => handleVolumeChange(e.value)}
                        onWheel={(e) => {
                            // e.preventDefault();
                            let newVolume = volume * 100;
                            if (e.deltaY < 0) {
                                newVolume = Math.min(newVolume + 5, 100);
                            } else {
                                newVolume = Math.max(newVolume - 5, 0);
                            }
                            handleVolumeChange(newVolume);
                        }}
                    />
                </div>

                <button className={cx('right-action-bar-btn')} onClick={() => console.log(11111)}>
                    <MiniPlayerIcon className={cx('right-action-bar-icon')} />
                </button>
                <button className={cx('right-action-bar-btn')} onClick={() => console.log(11111)}>
                    <FullScreenIcon className={cx('right-action-bar-icon')} />
                </button>
            </div>
        </div>
    );
}

export default ControlBar;
