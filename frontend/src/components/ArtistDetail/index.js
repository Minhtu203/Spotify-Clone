import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArtist } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';

function ArtistDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const artists = useSelector((state) => state.artists.artist?.allArtist);

    useEffect(() => {
        getAllArtist(dispatch, navigate);
    });
    return <h1 style={{ color: 'white' }}>ArtistDetail</h1>;
}

export default ArtistDetail;
