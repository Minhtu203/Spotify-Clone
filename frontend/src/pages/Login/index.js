import classNames from 'classnames/bind';
import style from './Login.module.scss';
import 'primeicons/primeicons.css';
import { ErrorIcon, SpotifyIcon } from '../../assets/Icon';
import { useState } from 'react';
import { loginUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);
function Login() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const newUser = {
            userName: userName.trim(),
            password: password.trim(),
        };
        const errMessage = await loginUser(newUser, dispatch, navigate);
        if (errMessage) {
            setError(errMessage);
        }
        // loginUser(newUser, dispatch, navigate);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-container')}>
                    <span>
                        <SpotifyIcon width="3.2rem" height="3.2rem" />
                    </span>
                    <span className={cx('header-title')}>Log in to Spotify</span>
                </div>
                <form className={cx('input-login-container')} onSubmit={handleLogin}>
                    <span className={cx('input-login-title')}>Email or username</span>
                    <input
                        className={cx('input-login')}
                        placeholder="Email or username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className={cx('input-password')}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <div className={cx('error-alert')}>
                            <i className={cx('pi pi-info-circle')} style={{ color: '#f3727f' }}></i>
                            <span className={cx('error-title')}>
                                Email or username isn't linked to a Spotify account
                            </span>
                        </div>
                    )}
                    <button className={cx('continue-btn')}>Continue</button>
                </form>
                <div className={cx('sign-up')}>
                    <span style={{ color: 'var(--gray)' }}>Don't have an account?</span>
                    <a href="/register" className={cx('sign-up-link')}>
                        Sign up for Spotify
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
