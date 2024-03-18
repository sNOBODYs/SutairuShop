import React from 'react'
import '../styles/OAuth.css';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { auth } from '../config/firebase.js';
import { UseDispatch, useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';

export default function OAuth() {
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:3000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
        }),
    });
    const data = await res.json();
    console.log(data);
    dispatch(signInSuccess(data));
} catch (error) {
    console.log("Could not login with Google", error);
}
    }
return (
    <div>
        <button type='button' onClick={handleGoogleClick} className='Oauth-button'>Continue with Google</button>
    </div>
)
}
