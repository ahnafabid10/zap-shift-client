import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
        const {
            register,
            handleSubmit,
            control,
            // formState: { errors } 
        } = useForm();

            const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const regions = [...new Set(regionsDuplicate)];
    // explore useMemo useCallback
    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const riderRegion = useWatch({ control, name: 'riderRegion' });

    const handleRider = (data)=>{
        console.log(data)
        axiosSecure.post('/riders', data)
        .then(res=>{
            if(res.data.insertedId){
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Application has been submitted. We will reach to you in 45 days",
                showConfirmButton: false,
                timer: 2500
                });
            }
        })
    }


    return (
        <div>
            <h2 className='text-4xl'>Be a Rider</h2>
            <form onSubmit={handleSubmit(handleRider)} className='mt-12 p-4 text-black'>


                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* rider Details */}

                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Rider Details</h4>
                        {/* rider name */}
                        <label className="label">Rider Name</label>
                        <input type="text" {...register('riderName')}
                            defaultValue={user?.displayName}
                            className="input w-full" placeholder="Rider Name" />

                        {/* rider email */}
                        <label className="label">Rider Email</label>
                        <input type="text" {...register('riderEmail')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Rider Email" />

                        {/* rider region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Regions</legend>
                            <select {...register('riderRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* rider districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Districts</legend>
                            <select {...register('riderDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* rider address */}
                        <label className="label mt-4">Rider Address</label>
                        <input type="text" {...register('riderAddress')} className="input w-full" placeholder="Rider Address" />


                    </fieldset>
                    {/* receiver Details */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">More Information</h4>
                        {/* receiver name */}
                        <label className="label">Driving License</label>
                        <input type="text" {...register('drivingLicense')} className="input w-full" placeholder="Driving License" />

                        {/* receiver email */}
                        <label className="label">Nid</label>
                        <input type="text" {...register('nid')} className="input w-full" placeholder="nid" />


                        {/* receiver address */}
                        <label className="label mt-4">Bike Information</label>
                        <input type="text" {...register('bike')} className="input w-full" placeholder="Bike" />


                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary mt-8 text-black' value="Apply as a Rider" />
            </form>
        </div>
    );
};

export default Rider;