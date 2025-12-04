import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {


    const {user, loading} = UseAuth()

    if(loading){
        return <div className=''>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }


    return children
};

export default PrivateRoutes;