import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';


const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email,password)
    }

    const signInUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser =()=>{
        setLoading(true)
        return signOut(auth);
    }

    const signInGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // observe user state
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>unSubscribe()
    },[])



    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signOutUser,
        signInGoogle
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;