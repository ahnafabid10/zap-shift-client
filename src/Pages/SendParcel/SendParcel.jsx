import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';

const SendParcel = () => {

    const { 
        register, 
        handleSubmit,
        control,
        // formState: { errors}
    } = useForm()

    const {user} = UseAuth()

    const axiosSecure = useAxiosSecure()

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    console.log(regions);
    const senderRegion = useWatch({control, name: 'senderRegion'})
    const receiverRegion = useWatch({control, name: 'receiverRegion'})

    const districtByRegion = (region)=>{
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d=>d.district);
        return districts;
    }

    const handleSendParcel = (data) => {
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight)
        
        let cost = 0;
        if(isDocument){
            cost = isSameDistrict ? 60 : 80;
        }
        else{
            if(parcelWeight < 3){
                cost = isSameDistrict ? 110 : 150;
            }
            else{
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3
                 const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;

                cost = minCharge + extraCharge;
            }

        }
        // return cost;
        console.log('Parcel Cost:', cost);

        Swal.fire({
  title: "Agree with the cost?",
  text: `You will be charged ${cost} taka!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "I agree!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.post('/parcels', data)
    .then(res=>{
        console.log('after saving parcel', res.data)
    })

    // Swal.fire({
    //   title: "Order SUccess!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    // });
  }
});

    }

    return (
        <div>
            <h2 className="text-5xl font-bold">Send A parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)}
                className='mt-12 p-4 text-black'
            >
                {/* parcel type */}
                <div>
                    <label className="label mr-4">
                        <input type="radio" className="radio" {...register('parcelType', { required: true })} value='document' defaultChecked />
                        Document</label>

                    <label className="label">
                        <input type="radio" className="radio" {...register('parcelType', { required: true })} value='non-document' />
                        Non-Document</label>
                </div>
                {/* parcel info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" className="input w-full" placeholder="Parcel Name" {...register('parcelName', { required: true })} />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input type="number" className="input w-full" placeholder="Parcel Weight" {...register('parcelWeight', { required: true })} />
                    </fieldset>
                </div>
                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender info */}

                    <fieldset className="fieldset">

                        <h4 className='text-2xl font-semibold'>Sender Details</h4>

                        {/* Sender Name */}
                        <label className="label">Sender Name</label>
                        <input type="text" className="input w-full" 
                        defaultValue={user?.displayName}
                        placeholder="Sender Name" {...register('senderName', { required: true })} />

                        {/* Sender Email */}
                        <label className="label">Sender Email</label>
                        <input type="email" 
                        defaultValue={user?.email}
                        className="input w-full" placeholder="Sender Email" {...register('senderEmail', { required: true })} />



                        {/* Sender Address */}

                        <label className="label mt-4">Sender Address</label>
                        <input type="text" className="input w-full" placeholder="Sender Address" {...register('senderAddress', { required: true })} />

                        {/* Sender Number */}

                        <label className="label mt-4">Sender Number</label>
                        <input type="number" className="input w-full" placeholder="Sender Number" {...register('senderNumber', { required: true })} />


                    {/* Sender Region */}
                        <fieldset className="fieldset">
  <legend className="fieldset-legend">Sender Regions</legend>
  <select {...register('senderRegion')} defaultValue="Pick a Region" className="select">
    <option disabled={true}>Pick a Region</option>
        {
            regions.map((r, i ) => <option key={i} value={r}>{r}</option>)
        }
  </select>
</fieldset>

                        {/* Sender District */}

                       <fieldset className="fieldset">
  <legend className="fieldset-legend">Regions</legend>
  <select {...register('senderDistrict')} defaultValue="Pick a District" className="select">
    <option disabled={true}>Pick a District</option>
        {
            districtByRegion(senderRegion).map((r, i ) => <option key={i} value={r}>{r}</option>)
        }

  </select>
  <span className="label">Optional</span>
</fieldset>

                        {/* Pickup Instruction */}
                        <label className="label mt-4">Pickup Instruction</label>
                        <input type="text" className="input w-full" placeholder="Pickup Instruction" {...register('pickupInstruction')} />


                    </fieldset>


                    <fieldset className="fieldset">
                        {/* Receiver info */}
                        <h4 className='text-2xl font-semibold'>Receiver Details</h4>

                        {/* Receiver Name */}
                        <label className="label">Receiver Name</label>
                        <input type="text" className="input w-full" placeholder="Receiver Name" {...register('receiverName', { required: true })} />

                        {/* Receiver Email */}
                        <label className="label">Receiver Email</label>
                        <input type="email" className="input w-full" placeholder="Receiver Email" {...register('receiverEmail', { required: true })} />

                        {/* Receiver Address */}

                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" className="input w-full" placeholder="Receiver Address" {...register('receiverAddress', { required: true })} />

                        {/* Receiver Number */}

                        <label className="label mt-4">Receiver Number</label>
                        <input type="number" className="input w-full" placeholder="Receiver Number" {...register('receiverNumber', { required: true })} />

                        {/* Receiver Region */}
                        <fieldset className="fieldset">
  <legend className="fieldset-legend">Receiver Regions</legend>
  <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select">
    <option disabled={true}>Pick a Region</option>
        {
            regions.map((r, i ) => <option key={i} value={r}>{r}</option>)
        }
  </select>
</fieldset>

                        {/* Receiver District */}
<fieldset className="fieldset">
  <legend className="fieldset-legend">Receiver District</legend>
  <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select">
    <option disabled={true}>Pick a District</option>
        {
            districtByRegion(receiverRegion).map((d, i)=><option key={i} value={d}>{d}</option>)
        }
  </select>
</fieldset>
                        

                        {/* Pickup Instruction */}
                        <label className="label mt-4">Delivery Instruction</label>
                        <input type="text" className="input w-full" placeholder="Delivery Instruction" {...register('deliveryInstruction', { required: true })} />


                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary text-black mt-4' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;