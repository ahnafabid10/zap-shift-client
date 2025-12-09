import { useQueries } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payment = () => {

    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure()

    const { isLoading, data: parcel} = useQueries({
        queryKey: ['parcels', parcelId],
        queryFn : async () =>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.send;
        }

    })

    if(isLoading){
        return <div className=''>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    return (
        <div>
            <h2>Please Pay: ${parcel.cost} for: {parcel.parcelName}</h2>
            <button className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;