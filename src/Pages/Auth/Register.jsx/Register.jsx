import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {

    const {register, handleSubmit, formState: {errors}}= useForm();

    const handleRegistration = (data)=>{
        console.log(data)
    }


    return (  
        <div>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
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
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
            </form>
        </div>
    );
};

export default Register;