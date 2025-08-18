import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';

import { ExpandIcon, ListIcon, PlusIcon, SearchIcon } from '../../../assets/Icon';
import ArtirstLiked from '../../ArtistLiked';

const cx = classNames.bind(style);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className={cx('library')}>Your Library</span>
                    <div className={cx('create-container')}>
                        <div className={cx('create-btn')}>
                            <span>
                                <PlusIcon />
                            </span>
                            Create
                        </div>

                        <button className={cx('expand-btn')}>
                            <ExpandIcon />
                        </button>
                    </div>
                </div>

                <div className={cx('header-btn')}>
                    <button>Playlists</button>
                    <button>Artists</button>
                    <button>Albums</button>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('search-recent-icon')}>
                    <button className={cx('search-content-icon')}>
                        <SearchIcon width="1.8rem" height="1.8rem" />
                    </button>
                    <button className={cx('recent-btn')}>
                        Recents
                        <span style={{ marginLeft: '0.8rem' }}>
                            <ListIcon />
                        </span>
                    </button>
                </div>

                <div className={cx('content-list')}>
                    <ArtirstLiked />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
