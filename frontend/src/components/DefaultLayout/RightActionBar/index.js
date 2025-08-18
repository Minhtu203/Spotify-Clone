import classNames from 'classnames/bind';
import style from './RightActionBar.module.scss';

const cx = classNames.bind(style);

function RightActionBar() {
    return (
        <div className={cx('wrapper')}>
            <h1 style={{ color: 'white' }}>RightActionBar</h1>
        </div>
    );
}

export default RightActionBar;
