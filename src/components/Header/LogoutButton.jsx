import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from  '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LogoutButton() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logoutHandler = () =>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
            localStorage.removeItem('currentUser')
            navigate('/login')
            toast.error("Successfully logged out")
        })
        .catch((err)=> console.log(err))
    }

    return (
        <button
        onClick={logoutHandler}
        className='inline-bock px-6 py-2 duration-200 text-white hover:bg-[#38304c] hover:text-red-500 rounded-full font-montserrat'
        
        >Logout</button>
    )
}

export default LogoutButton