import classNames from 'classnames/bind';
import style from './FollowButton.module.scss';

const cx = classNames.bind(style);

export const FollowButton = ({ width, height, style }) => (
    <button
        className={cx('follow-btn')}
        style={{
            width,
            height,
        }}
    >
        Follow
    </button>
);

export const UnFollowBtn = ({ width, height, style }) => (
    <button
        className={cx('follow-btn')}
        style={{
            width,
            height,
        }}
    >
        Unfollow
    </button>
);
