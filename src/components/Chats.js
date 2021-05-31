import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from './firebase.config';

import { useAuth } from '../components/context/AuthContext'
import axios from 'axios';

export const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async () => {

        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); //binary file, any file

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            header: {
                "project-id": "4034a86c-59e7-459d-b857-e9ba2910d863",
                "user-name": user.email,
                "user-secret": user.uid
            }
        }).then(() => {
            setLoading(false);
        })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL) // api to get an image
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);

                        axios.post('https://api.chatengine.io/users',
                            formdata,
                            { headers: { "private-key": "e3ba2354-954f-4afa-a1b8-1d2d6c26608f" } }
                        )
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    }) //fetch the users
            })

    }, [user, history]);


    if (!user || loading) return 'Loading...'
    return (
        <div className="chat-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Chitchat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine

                heigh="calc(100vh - 66px)"
                projectID="4034a86c-59e7-459d-b857-e9ba2910d863"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>

    )
}

export default Chats;