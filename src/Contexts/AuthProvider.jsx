import React from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';


const AuthProvider = ({children}) => {

    const registerUser =(email,password)=>{
        return createUserWithEmailAndPassword(auth, email,password)
    }

    const signInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser =()=>{
        return signOut(auth);
    }


    const authInfo = {
        registerUser,
        signInUser,
        signOutUser
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;