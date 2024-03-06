import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css';
import authService from "./appwrite/auth"
import { login, logout } from './features/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [loading, setLoading ] = useState(true);
    const dispatch = useDispatch()

    useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
          toast.success(`Welcome! ${userData.name}`,{hideProgressBar: true})
        }
        else
          dispatch(logout())
      })
      .finally(()=> setLoading(false))
    }, [])

  return !loading ? (
      <div className='min-h-screen flex flex-wrap content-between'>
        <div className=' flex flex-col content-between w-full'>
          <Header />
          <main className="bg-[#201a30]">
            <Outlet />
          </main>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition:Slide
            theme="dark"
            toastStyle={{ color: '#dd1b5c' }}
          />
        </div>
      </div>
  ) : null;
}

export default App
