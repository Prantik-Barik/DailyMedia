import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../features/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const create = async(data) =>{
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(login(userData));
                    toast.success(`DailyBlog Welcomes You, ${userData.name}`)
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div className="flex items-center justify-center w-full font-poppins ">
            <div className={`mx-auto w-full max-w-lg bg-[#38304c] rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-fit">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-white">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-[#8c8a9c]">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        <span className='text-[#634cdd]'>Sign In</span>
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        className = "hover:ring-2"/>
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        className = "hover:ring-2"/>
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || setError('Password must have atleast one uppercase and number')
                            }
                        })}
                        className = "hover:ring-2"/>
                        <Button type="submit" className="w-full hover:font-bold hover:text-black">
                            <span className='font-poppins tracking-wide'>Create Account</span>
                        </Button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default Signup