import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link, useLocation } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {

    const {register, handleSubmit, formState: {errors}}= useForm();

    const {registerUser,updateUserProfile} = UseAuth()
    const location = useLocation();
    const navigate = useLocation();
    const axiosSecure = useAxiosSecure()

    const handleRegistration = (data)=>{
        console.log(data)
        const profileImg = data.photo[0]

        registerUser(data.email,data.password)
        .then(result=>{
            console.log(result.user)
            //store the image and get the photo url
             const formData = new FormData()
            formData.append('image', profileImg)

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
            axios.post(image_API_URL, formData)
            .then(res=>{
                const photoURL = res.data.data.url;

                // create user in the database
                const userInfo = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: photoURL
                }
                axiosSecure.post('/users', userInfo)
                .then(res=>{
                    if(res.data.insertedId){
                        console.log('user in database')
                    }
                })


                //update user profile
                const userProfile = {
                    displayName: data.name,
                    photoURL:photoURL
                }
                updateUserProfile(userProfile)
                .then(()=>{
                    console.log('user profile updated')
                    navigate(location?.state || '/')
                })
                .catch(error => console.log(error))

            })
            
        })
        .catch(error=>{
            console.log(error.message)
        })
    }


    return (  
        <div className='card p-5 bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl'>
            <h3 className="text-3xl  font-bold text-center">Welcome Back</h3>
            <div className="text-lg text-center text-medium">Please Login</div>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* Name */}
          <label className="label">Email</label>
          <input type="text" {...register('name', {required:true})} className="input" placeholder="Your Name" />
          {errors.name?.type==="required" && <p className='text-red-500'>Name is requires.</p>}
                    {/* Photo Image field*/}
          <label className="label">Photo </label>

          <input type="file" {...register('photo', {required:true})} className="file-input" placeholder='Your Photo'/>
    
          {errors.name?.type==="required" && <p className='text-red-500'>Photo is requires.</p>}
          
                    {/* Email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required:true})} className="input" placeholder="Email" />
          {errors.email?.type==="required" && <p className='text-red-500'>Email is requires.</p>}
          {/* Password */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{
            required:true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            })} className="input" placeholder="Password" />
            {
                errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
            }
            {
                errors.password?.type ==='minLength' && <p className='text-red-500'>Password must be 8 characters or longer.
                </p>
            }
            {
                errors.password?.type === 'pattern' && <p className='text-red-500'>
                Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                </p>
            }
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>Already have an account? <Link state={location.state} className='text-blue-400' to='/login'>Login</Link></p>
        <SocialLogin></SocialLogin>
            </form>
        </div>
    );
};

export default Register;