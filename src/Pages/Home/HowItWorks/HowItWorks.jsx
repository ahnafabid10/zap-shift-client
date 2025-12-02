import React from 'react';
import { CiDeliveryTruck } from "react-icons/ci";


const HowItWorks = () => {
    const dataJson = [
  {
    "title": "Booking Pick & Drop",
    "description": "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    "title": "Cash On Delivery",
    "description": "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    "title": "Delivery Hub",
    "description": "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    "title": "Booking SME & Corporate",
    "description": "From personal packages to business shipments — we deliver on time, every time."
  }
]
    return (
        <div>
            <h2 className='text-2xl font-bold text-secondary'>How it Works</h2>
            <div className='grid grid-cols-4  gap-4 mt-8'>
                {
                    dataJson.map((data,index)=>{
                        return (
                            <div className=''> 
                                <div key={index} className='border space-y-3 p-4 my-4 rounded-lg'>
                                <CiDeliveryTruck className='text-4xl'/>
                                <h3 className='text-xl font-semibold text-primary'>{data.title}</h3>
                                <p>{data.description}</p>
                            </div>
                            </div>
                            
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HowItWorks;