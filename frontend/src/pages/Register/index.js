import classNames from 'classnames/bind';
import style from './Register.module.scss';
import { SpotifyIcon } from '../../assets/Icon';
import { useState } from 'react';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Register() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
            userName: userName,
        };
        registerUser(newUser, dispatch, navigate);
        alert('Register successfull');
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('container')} onSubmit={handleRegister}>
                <div className={cx('header-container')}>
                    <span>
                        <SpotifyIcon width="4rem" height="4rem" style={{ marginBottom: '1rem' }} />
                    </span>
                    <span className={cx('header-container-title')}>Sign up to</span>
                    <span className={cx('header-container-title')} style={{ marginBottom: '4rem' }}>
                        start listening
                    </span>
                </div>
                <div className={cx('input-info')}>
                    <span className={cx('email')}>Email address</span>
                    <input
                        className={cx('set-email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <span className={cx('username')}>Username</span>
                    <input
                        className={cx('set-username')}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                    />
                    <span className={cx('password')}>Password</span>
                    <input
                        className={cx('set-password')}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className={cx('next-btn')}>Next</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
