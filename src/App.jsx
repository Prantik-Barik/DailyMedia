import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css';
import authService from "./appwrite/auth"
import { login, logout } from './features/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom';
import { Spin } from 'antd';

function App() {
    const [loading, setLoading ] = useState(true);
    const dispatch = useDispatch()

    useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        console.log(userData)
        if(userData)
          dispatch(login({userData}))
        else
          dispatch(logout())
      })
      .finally(()=> setLoading(false))
    }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-700'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
