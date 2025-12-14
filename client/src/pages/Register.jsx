import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
function Register() {
    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting },
        }=useForm();
    
    const navigate=useNavigate()

    const onSubmit=async (data)=>{
        try {
            await registerUser(data);
            navigate("/login")
        } catch (error) {
            alert("Register Failed")
            console.log(error)
        }
    };


  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2>Create an Account</h2>
                <div>
                    <label className="block text-sm">Name</label>
                    <input
                    type='text'
                    placeholder='Enter your Name'
                    className='w-full p-2 border rounded'
                    {...register("name",{required:"Name is required"})}
                    />
                    {errors.name &&
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    }
                </div>
                <div>
                    <label className="block text-sm">Email</label>
                    <input
                    type='email'
                    placeholder='Enter your Email'
                    className='w-full p-2 border rounded'
                     {...register("email",{required:"Email is required"})}
                    />
                    {errors.email &&
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    }
                </div>
                <div>
                    <label className="block text-sm">Password</label>
                    <input
                    type='password'
                    placeholder='Enter your Password'
                    className='w-full p-2 border rounded'
                     {...register("password",{required:"password is required"})}
                    />
                    {errors.password &&
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    }
                </div>
                <button 
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white p-2 rounded">
                {isSubmitting ? "Registering..." : "Register"}
                </button>
        </form>        
    </div>
  )
}

export default Register