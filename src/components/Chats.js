import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine'
import { useHistory } from 'react-router';
import { useAuth } from './context/AuthContext';
import { auth } from './firebase.config';

const Chats = () => {

    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { user } = useAuth()
    console.log(user.photoURL);

    const handleLogOut = async () => {
        await auth.signOut()
        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data], "userPhoto.jpeg", { type: "images/jpeg" })
    }

    useEffect(() => {
        if (!user || user === null) {
            history.push('/')

            return
        }
        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": "4034a86c-59e7-459d-b857-e9ba2910d863",                 
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })

            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                let formdata = new FormData()
                formdata.append('email', user.email)
                formdata.append('userName', user.email)
                formdata.append('secret', user.uid)

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name)

                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            { headers: { "private-key": "e3ba2354-954f-4afa-a1b8-1d2d6c26608f" } }
                        )
                            .then(() => setLoading(false))
                            .catch(e => console.log('e', e.response))
                    })

            })

    }, [user, history])

    if (!user || loading) return 'Loading...'

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ChitChat
                </div>
                <div onClick={handleLogOut} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh -66px)"
                projectID="4034a86c-59e7-459d-b857-e9ba2910d863"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;