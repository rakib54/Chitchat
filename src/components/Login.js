import React from 'react';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons'
import firebase from 'firebase';

import { auth } from './firebase.config';


const Login = () => {

    return (
        <div id="login-page">
            <div id="login-card">
                <h1>Welcome to <span style={{color:'#c05931'}}>ChitChat</span></h1>
                <p>Chat to login</p>

                <div className="login-button google" onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <GoogleOutlined /> Sign In with Goggle
                </div>
                <br /><br />
                <div className="login-button facebook" onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
                    <FacebookOutlined /> Sign In with Facebook
                </div>
            </div>
        </div>
    );
};

export default Login;