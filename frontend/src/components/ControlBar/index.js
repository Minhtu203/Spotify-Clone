import classNames from 'classnames/bind';
import style from './ControlBar.module.scss';

const cx = classNames.bind(style);

function ControlBar() {
    return (
        <>
            <div className={cx('wrapper')}></div>
        </>
    );
}

export default ControlBar;
