import React from 'react'
import { GoogleOutlined, FacebookOutlined, MessageOutlined } from '@ant-design/icons'
import 'firebase/app'
import { auth } from '../components/firebase'
import firebase from 'firebase/app'

function Login() {
    return (
        <div id='login-page'>
            <div id='login-card'>
                <h2>Welcome to UniChat</h2>

                <div className='login-button google' onClick={() => auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider())}>
                    
                    {/* It will signInWithRedirect is auth object function and it will enables us tologin with google and facebook directly. */}

                    <GoogleOutlined /> Signin with Google
                </div>

                <br /> <br />

                {/* <div className='login-button facebook' onClick={() => auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider())}>
                    <FacebookOutlined /> Signin with Facebook
                </div> */}


            </div>
        </div>
    )
}

export default Login