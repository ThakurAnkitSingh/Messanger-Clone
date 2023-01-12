import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from './firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
require('dotenv').config();






function Chats() {


    const history = useHistory();

    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut(); // It will logout the user and send the user to login part
        history.push('/');
    }

    const getFile = async (url) => {
        // this will handle images 

        const response = await fetch(url);
        const data = await response.blob() // blob is a fn which contain any file type and images and tranfer over in binary format

        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })

    }

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        }

        // If user present
        // axios will call to chatengine user 
        // Existing User
        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                // these userName and userSecret is coming from auth firebase
                "project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-Name": user.email,
                "user-Secret": user.uid,
                // "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
            }
        })
            .then(() => { // if we have already an user then show the specific chat for that user
                setLoading(false);
            })
            // Creating User
            .catch(() => { // If the user don't have chatEngine profile then we will prepare the data and create a profile

                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name)

                        // Creating user
                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            { headers: { "private-Key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                        )
                            .then(() => setLoading(false)) // User creation Successfull then
                            .catch((error) => console.log(error, "Error Occurred")) // User creation unsuccessfull
                    })
            })
    }, [user, history])

    if (!user || loading) return <h2>Loading.....</h2>;

    return (
        <div className='chats-page'>
            <div className='nav-bar'>

                <div className='logo-tab'>
                    Message me!
                </div>

                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>

            </div>

            <ChatEngine
                height="calc(100vh - 64px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email} // it will give undefined when it mounts (time)
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats