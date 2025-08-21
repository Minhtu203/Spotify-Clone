import classNames from 'classnames/bind';
import style from './ControlBar.module.scss';

const cx = classNames.bind(style);

function ControlBar() {
    return (
        <div className={cx('wrapper')}>
            <div>pic + name</div>
            <div>
                <div>pause, play</div>
                <div>duration</div>
            </div>
            <div>lyric, volume,...</div>
        </div>
    );
}

export default ControlBar;
