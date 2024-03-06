import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import {Button, Input, Logo} from "./index"
import { toast } from 'react-toastify'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData))
                    localStorage.setItem('currentUser', userData.$id)
                    toast.success(`DailyBlog Welcomes You! ${userData.name}`)
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full font-poppins my-5'
    >
        <div className={`mx-auto w-full max-w-lg bg-[#38304c] rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-fit">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#ffff]">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-[#8c8a9c]">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary
                        transition-all duration-200 hover:underline"
                    >
                        <span className='text-[#634cdd]'>Sign Up</span>
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5 '>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate:{
                        matchPattern : (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                className = "hover:ring-2 hover:ring-green-500"/>
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required: true,
                })}
                className = "hover:ring-2"/>
                <Button
                type="submit"
                className="w-full hover:font-bold hover:text-black mt-10"
                ><span className='font-poppins tracking-wide'>Sign in</span></Button>
                <div className='text-center'>
                <Link
                        to="/change-password"
                        className="font-medium text-primary
                        transition-all duration-200 hover:underline"
                >
                        <span className='text-[#634cdd]'>Forget Password ?</span>
                    </Link>
                </div>
            </div>
        </form>
        </div>
    </div>
  )
}


export default Login