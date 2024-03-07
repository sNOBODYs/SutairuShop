import React, { useContext, useState , useEffect} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth(){
return useContext(AuthContext)
}

export  function AuthProvider({ children }) {
const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
      return  createUserWithEmailAndPassword(email,password)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(user =>{
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup
      }
  

  return (
    <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
  )
}
