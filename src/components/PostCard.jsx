import React from 'react'
import appwriteService from '../appwrite/conf'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faEye, faEyeSlash, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { toTitleCase } from '../features/toTitleCase'
import { createdAt } from '../features/createdAt';

function PostCard({$id, title, featuredImage, $createdAt, status, isPremium}) {
  
  let dateString = $createdAt;
  
  return (
    <Link to={`/post/${$id}`}>
        <div className='max-w-md overflow-hidden h-full shadow-xl bg-[#38304c] rounded-xl p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 animate__animated animate__fadeIn'>
            <div className='w-full h-auto justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl object-cover h-64 w-full'/>
            </div>
            <div className='flex flex-row space-y-2 justify-between'>
              <div>
                <h2 className='font-poppins font-semibold text-[#564df5]'>{createdAt(dateString)}</h2>
                <h2 className='text-xl font-bold py-2 text-wrap overflow-hidden font-montserrat text-white'>{toTitleCase(title)}</h2>
              </div>
              <div className='flex flex-col gap-2 items-center justify-center'>
                { 
                  (status === 'active') ? 
                  <div className='flex flex-row gap-3 items-center'>
                    <FontAwesomeIcon icon={faEye} className='fa-1x' style = {{color : '#22c55e'}}/><span className='text-green-500 font-bold text-wrap overflow-auto font-montserrat'>Published</span>
                  </div> : 
                  <div className='flex flex-row gap-3 items-center'>
                    <FontAwesomeIcon icon={faEyeSlash} className='fa-1x fa-beat' style = {{color : "#ef4444"}}/> <span className='text-red-500 text-wrap overflow-hidden font-bold font-montserrat'>UnPublished</span>
                  </div> 
                }
                {
                  (isPremium === 'premium') ? 
                    <div className='flex flex-row gap-3 items-center'>
                      <FontAwesomeIcon icon={faSackDollar} className='fa-xl' style={{color: "#ea9708",}} />
                      <span className='text-yellow-600 font-bold text-wrap overflow-auto font-montserrat'>Premium</span>
                    </div> 
                    : 
                    <div className='flex flex-row gap-3 items-center'>
                    <FontAwesomeIcon icon={faCircleCheck} className='fa-xl' style={{color: "#22c55e",}} />
                    <span className='text-green-500 font-bold text-wrap overflow-auto font-montserrat'>Free</span>
                  </div>
                }
              </div>
            </div>
            
        </div>
    </Link>
  )
}

export default PostCard