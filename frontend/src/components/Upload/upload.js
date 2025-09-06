import classNames from 'classnames/bind';
import style from './upload.module.scss';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadSong } from '../../redux/apiRequest';
import { useSongState } from '../../store';

const cx = classNames.bind(style);

function Upload() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const convertToBase64 = (file) =>
    //     new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });

    const { setUpdate } = useSongState();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('artist', data.artist);
        formData.append('plays', data.plays || 0);

        formData.append('audioUrl', data.audioUrl[0]);
        formData.append('avatar', data.avatar[0]);

        UploadSong(formData); // gửi lên backend
        setUpdate();
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Upload song</span>
            <div className={cx('item')}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <span>Name</span>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <input {...register('name', { required: true })} type="text" placeholder="Song name" />
                            {errors.name && <i>"Name" không được để trống</i>}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <span>Audio</span>

                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <label className={cx('file-upload')}>
                                <button>Choose file</button>
                                <input
                                    {...register('audioUrl', { required: true })}
                                    type="file"
                                    style={{ display: 'none' }}
                                />
                                {errors.audioUrl && <i>Audio không được để trống</i>}
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <span>Avatar</span>

                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <input {...register('avatar', { required: true })} type="file" />
                            {errors.avatar && <i>"Avatar" không được để trống</i>}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <span>Artist</span>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <input {...register('artist', { required: true })} placeholder="Artist ID" />
                            {errors.artist && <i>"Artist" không được để trống</i>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <span>Plays</span>
                        <input {...register('plays')} type="number" placeholder="Plays" />
                    </div>
                    <button className={cx('submit', 'title')} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Upload;
