import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyParcels = () => {
    
    const {user} = UseAuth()
    const axiosSecure = useAxiosSecure()

    const {data: parcels = []} = useQuery({
        queryKey: ['myParcels', user?.email ],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/parcels?email=${user.email}`) 
            return res.data
        }
    })

    return (
        <div>
            All of my parcels: {parcels.length}
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Cost</th>
        <th>Payment Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
     {
        parcels.map((parcel, index) => 
            <tr key={parcel._id}>
        <th>{index + 1}</th>
        <td>{parcel.name}</td>
        <td>{parcel.cost}</td>
        {/* <td>{parcel}</td>
        <td>{parcel}</td> */}
      </tr>
        )
     }
      
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyParcels;