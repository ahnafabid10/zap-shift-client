import { useQueries } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {

    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payments = []} = useQueries({
        queryKey: ['payments', user.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    });

    return (
        <div>
            <h2 className=" text-5xl">Payment History: {payments.length }</h2>

        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Amount</th>
        <th>Transaction Id</th>
      </tr>
    </thead>
    <tbody>
        {
            payments.map((payment , index) => <tr key={payment._id}>
        <th>{index + 1}</th>
        <td>Cy Ganderton</td>
        <td>${payment.amount}</td>
        <td>{payment.transactionId}</td>
      </tr>)
        }
      
    </tbody>
  </table>
</div>

        </div>
    );
};

export default PaymentHistory;