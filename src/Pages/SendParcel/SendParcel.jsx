import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const handleSendParcel = (data)=>{

    }

    return (
        <div>
            <h2 className="text-5xl font-bold">Send A parcel</h2>.
            <form onSubmit={ handleSubmit(handleSendParcel)}>
                {/* document */}
                <div>
                    
                </div>
                {/* parcel info */}
                <div>

                </div>
                {/* two column */}
                <div>
                    {/* sender info */}
                    <div>

                    </div>
                    {/* receiver info */}
                </div>
            </form>
        </div>
    );
};

export default SendParcel;