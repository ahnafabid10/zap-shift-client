import React from 'react';
// import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {


    const {user, loading} = UseAuth()
    const location = useLocation();
    console.log('location', location)

    if(loading){
        return <div className=''>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if(!user){
        return <Navigate to='/login' state={location.pathname} replace></Navigate>
    }


    return children
};

export default PrivateRoutes;