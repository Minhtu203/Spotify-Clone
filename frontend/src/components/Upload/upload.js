import classNames from 'classnames/bind';
import style from './upload.module.scss';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadSong } from '../../redux/apiRequest';

const cx = classNames.bind(style);

function Upload() {
    // const [name, setName] = useState('');
    // const [artist, setArtist] = useState('');
    // const [plays, setPlays] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => UploadSong(data);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Upload song</span>
            <div className={cx('item')}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <span>Name</span>
                        <input {...register('name', { required: true })} type="text" />
                        {errors.name && <span>"Name" không được để trống</span>}
                    </div>

                    <div>
                        <span>Audio</span>
                        <input {...register('audioUrl', { required: true })} type="file" />
                    </div>

                    <div>
                        <span>Avatar</span>
                        <input {...register('avatar', { required: true })} type="file" />
                    </div>

                    <div>
                        <span>Artist</span>
                        <input {...register('artist', { required: true })} placeholder="Artist ID" />
                        {errors.artist && <span>"Artist" không được để trống</span>}
                    </div>
                    <div>
                        <span>Plays</span>
                        <input {...register('plays')} type="number" />
                    </div>
                    <input className={cx('submit', 'title')} type="submit" />
                </form>
            </div>

            {/* <button className={cx('submit', 'title')}>Submit</button> */}
        </div>
    );
}

export default Upload;
