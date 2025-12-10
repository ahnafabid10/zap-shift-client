import { useQueries } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaRegTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';


const ApproveRiders = () => {

    const axiosSecure = useAxiosSecure()
    const {data: riders = [], refetch} = useQueries({
        queryKey: ['riders', 'pending'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/riders')
            return res.data
        }
    })

    const updatedRiderStatus = (rider, status) =>{
        const updateInfo = { status: status, email: rider.email}
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
        .then(res => {
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Rider status is set to ${status}`,
                showConfirmButton: false,
                timer: 2500
                });
            }
        })
    }


    const handleApproval = (rider)=>{
        // const updateInfo = { status: 'approved'}
        // axiosSecure.patch(`/riders/${id}`, updateInfo)
        // .then(res => {
        //     if(res.data.modifiedCount){
        //         Swal.fire({
        //         position: "top-end",
        //         icon: "success",
        //         title: "Rider has been approved.",
        //         showConfirmButton: false,
        //         timer: 2500
        //         });
        //     }
        // })

        updatedRiderStatus(rider, 'approved')
    }


    const handleRejection = (rider)=>{
        updatedRiderStatus(rider, 'rejected')
    }

    return (
        <div>
            <h2 className="text-5xl">Riders Pending Approval:{riders.length} </h2>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {
        riders.map((rider, index)=><tr>
        <th>{index + 1}</th>
        <td>{rider.name}</td>
        <td>{rider.email}</td>
        <td><p className={`${rider.status=== "approved" ? "text-green-800" : "text-yellow-500"}  `}>{rider.status}</p>
            </td>
        <td>{rider.riderAddress}</td>
        <td>
            <button onClick={()=> handleApproval(rider)} className='btn'>
                <FaUserCheck />

            </button>
            <button onClick={()=> handleRejection(rider)} className='btn'>
                <IoPersonRemoveSharp></IoPersonRemoveSharp>
            </button>
            <button className='btn'>
                <FaRegTrashCan></FaRegTrashCan>

            </button>
        </td>
      </tr>
        )
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ApproveRiders;