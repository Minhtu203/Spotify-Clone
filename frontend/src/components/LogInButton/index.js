import React from 'react';
import style from './LogInButton.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

export default function LogInButton() {
    // const { signIn, isLoaded } = useSignIn();
    // if (!isLoaded) {
    //     return null;
    // }

    // const Login = () => {
    //     signIn.authenticateWithRedirect({
    //         strategy: 'oauth_google',
    //         redirectUrl: '/sso-callback',
    //         redirectUrlComplete: '/auth-callback',
    //     });
    // };

    return (
        <>
            <div className={cx('wrapper')}>
                <Link className={cx('install-btn')} to="/download">
                    Install App
                </Link>
                <a className={cx('signup-btn')} href="/signup">
                    Sign up
                </a>
                <button className={cx('login-btn')}>Log in</button>
            </div>
        </>
    );
}
