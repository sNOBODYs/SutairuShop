import React from 'react'
import '../styles/OAuth.css';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../config/firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { getCartFailure, getCartStart, getCartSuccess } from '../redux/cart/cartSlice.js';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('https://sutairushop-backend.onrender.com/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
                credentials: 'include',
                mode: 'cors'
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            dispatch(getCartStart());
            const cartRes = await fetch(`https://sutairushop-backend.onrender.com/api/cart/get/${data._id}`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors' 
            });
            const cartData = await cartRes.json();
            if (cartData.success === false) {
                throw new Error(cartData.message);
            }
            dispatch(getCartSuccess(cartData));
            navigate('/');
        } catch (error) {
            console.log("Could not login with Google", error);
            dispatch(signInFailure(error.message));
            dispatch(getCartFailure(error.message));
        }
    }
    return (
        <div>
            <button type='button' onClick={handleGoogleClick} className='Oauth-button'>Continue with Google</button>
        </div>
    )
}
