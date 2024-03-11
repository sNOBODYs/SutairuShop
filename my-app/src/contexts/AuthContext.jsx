import React, { useContext, useState , useEffect} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase'

const AuthContext = React.createContext();

export function useAuth(){
return useContext(AuthContext)
}

export  function AuthProvider({ children }) {
const [currentUser, setCurrentUser] = useState();
const [loading, setLoading] = useState(true)
const [loggedIn, setLoggedIn] = useState(false);

    function signup(email, password) {
      return createUserWithEmailAndPassword( auth,email, password)
      .then(() => setLoggedIn(true))
    }

    function login(email, password) {
      return signInWithEmailAndPassword( auth,email, password)
      .then(() => setLoggedIn(true)) 
    }

    function logout(){
      return auth.signOut();
    }
    
    function resetPassword(email){
       return sendPasswordResetEmail(auth, email)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,user =>{
          setCurrentUser(user)
          setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        loggedIn,
        login,
        logout,
        signup,
        resetPassword
      }
  

  return (
    <AuthContext.Provider value = {value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
