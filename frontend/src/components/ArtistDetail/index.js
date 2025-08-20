import classNames from 'classnames/bind';
import style from './ArtistDetail.module.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistDetail } from '../../redux/apiRequest';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(style);

function ArtistDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const artist = useSelector((state) => state.artists.artist?.allArtist.find((a) => a._id === id));

    useEffect(() => {
        getArtistDetail(dispatch, navigate, artist._id);
    }, [artist._id, dispatch, navigate]);

    useEffect(() => {
        console.log('ArtistDetail mounted');
        return () => {
            console.log('ArtistDetail unmounted');
        };
    });
    return (
        <div className={cx('wrapper')}>
            {artist && (
                <div className={cx('content')}>
                    <div className={cx('content-bio')}>
                        <img className={cx('artist-coverpic')} alt={artist.name} src={artist.coverUrl} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtistDetail;
