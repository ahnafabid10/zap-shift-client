import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const {userName,user_photoURL, review: testimonial} =review;

    // const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

    return (
        <div className='bg-white rounded-2xl p-6 shadow-md min-h-[200px] flex flex-col justify-between'>
            <div>
                <div className='w-10 h-10 rounded-full bg-[#E9F6F6] flex items-center justify-center mb-3'>
                    <FaQuoteLeft className='text-xl text-[#7FC9C7]' />
                </div>

                <p className='text-sm text-gray-600 leading-relaxed'>
                    {testimonial}
                </p>
            </div>

            <div>
                <div className='border-b-2 border-dashed border-gray-300 opacity-30 w-24 mx-auto my-4'></div>

                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-[#03373D] flex items-center justify-center text-white text-sm overflow-hidden'>
                        <img src={user_photoURL} className='w-full h-full object-cover' />
                    </div>

                    <div>
                        <p className='font-semibold text-sm text-[#03373D]'>{userName}</p>
                        {/* <p className='text-xs text-gray-500'>{role}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;