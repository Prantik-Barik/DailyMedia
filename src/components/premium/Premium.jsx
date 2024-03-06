import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Premium() {
  return (
    <Link to={"/"}>
        <button>
            <div className='ring-1 ring-yellow-500 p-10 rounded-md text-center font-montserrat hover:bg-[#38304c]'>
                <h1 className='uppercase  font-bold text-2xl text-yellow-500 flex items-center gap-2'>
                    <FontAwesomeIcon icon={faBolt} className='fa-bounce'/>
                    Upgrade to PRO
                </h1>
                <p className='text-sm text-gray-500 text-center'>Unlock all Daily Media Contents</p>
            </div>
        </button>
    </Link>
  )
}

export default Premium