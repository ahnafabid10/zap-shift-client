import React from 'react';
import serviceIcon from '../../../assets/icons/service.png';

const OurServices = () => {
    const serviceData = [
        {
            "title": "Express & Standard Delivery",
            "description": "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
        },
        {
            "title": "Nationwide Delivery",
            "description": "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
        },
        {
            "title": "Fulfillment Solution",
            "description": "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
        },
        {
            "title": "Cash on Home Delivery",
            "description": "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
        },
        {
            "title": "Corporate Service / Contract In Logistics",
            "description": "Customized corporate services which includes warehouse and inventory management support."
        },
        {
            "title": "Parcel Return",
            "description": "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
        }
    ]
    return (
        <div className='bg-[#03373D] space-y-5 py-10 my-10 rounded-2xl'>
            <h2 className='text-white text-2xl font-bold text-center'>Our Services</h2>
            <p className='text-white text-center w-[600px] mx-auto'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6'>
                {
                    serviceData.map((data, index) => {
                        const highlight = index === 1;
                        return (
                            <div key={index} className={`relative hover:bg-[#CAEB66] bg-white rounded-2xl p-8 shadow-sm transition transform hover:-translate-y-1 hover:shadow-lg min-h-[220px]`}>
                                <div className='flex justify-center -mt-12'>
                                    <div className={`${highlight ? 'bg-white' : 'bg-[#F8FAFB]'} w-20 h-20 rounded-full flex items-center justify-center border  border-transparent`}>
                                        <img className='w-12 h-12' src={serviceIcon} alt="service icon" />
                                    </div>
                                </div>

                                <h3 className='text-center text-lg font-semibold text-[#03373D] mt-4'>{data.title}</h3>

                                <div className='border-b-2 border-dashed border-[#03373D] opacity-20 w-24 mx-auto my-4'></div>

                                <p className='text-center text-sm text-gray-600 px-2'>{data.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default OurServices;