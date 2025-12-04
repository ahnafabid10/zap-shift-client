import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const {signInUser}= UseAuth()

    const handleLogin = (data)=>{
        signInUser(data.email,data.password)
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error)
        })
    }   

    return (
        <div className=''>
            
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="card bg-base-100 w-full mx-auto  max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="text-3xl  font-bold text-center">Welcome Back</h3>
            <div className="text-lg text-center text-medium">Please Login</div>
        <fieldset className="fieldset">
            {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{
            required:true,
          })} className="input" placeholder="Email" />
            {
                errors.email?.type === 'required'&& <p className='text-red-500'> Email is required</p>
            }
          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{
            required:true,
            // minLength:8
          })} className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <p className='text-red-500'> Password is required</p>
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to Zap Shift? <Link className='text-blue-400' to='/register'>Register</Link></p>
          <SocialLogin></SocialLogin>
      </div>
    </div>
    
            </form>
        </div>
    );
};

export default Login;