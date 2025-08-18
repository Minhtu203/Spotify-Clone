import classNames from 'classnames/bind';
import style from './ArtirstLiked.module.scss';
import 'primeicons/primeicons.css';
import { PinIcon } from '../../assets/Icon';

const cx = classNames.bind(style);

function ArtirstLiked() {
    return (
        <>
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
        </>
    );
}

export default ArtirstLiked;
