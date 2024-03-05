import React from 'react'
import {Container, Logo, LogoutButton} from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux' 
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  
  const navItems = [
    {
      name : "Home",
      slug : "/",
      active : true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    }
  ]


  return (
    <header className='py-3 border border-t-gray-100 bg-[#201a30] font-semibold text-lg sticky top-0 z-10'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4 mt-2'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto items-center'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name} className='font-montserrat text-white'>
                <NavLink to = {item.slug}
                onClick={() => navigate(item.slug)}
                className={({isActive}) => `${isActive ? "text-green-500" : "text-white"} inline-bock px-6 py-2 duration-200 hover:bg-[#38304c] rounded-full`}
                >{item.name}</NavLink>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header