import React, { useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../config/firebase'
import { useDispatch } from 'react-redux';
import { signInFailure } from '..//redux/user/userSlice';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const data = '';

  function signup(username, email, password) {
    return fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
      credentials: 'include',
    })
      .then(data => {
        if (data.ok) {
          setCurrentUser(data.user);
          return data.user;
        } else {
          throw new Error('Signup request failed');
        }
      })
      .catch(error => {
        console.error('Signup error:', error);
        throw error;
      });
  }

  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        if (data.success === false) {
          console.log(data.message)
          throw new Error(data.message); 
        }
        setCurrentUser(userData); 
      } else {
        throw new Error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      throw error;
    }
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email)
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    data,
    login,
    logout,
    signup,
    resetPassword,
    updateUserEmail,
    updateUserPassword
  }


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
