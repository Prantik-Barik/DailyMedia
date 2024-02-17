import React from 'react'
import appwriteService from '../appwrite/conf'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faEye, faEyeSlash, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { toTitleCase } from '../features/toTitleCase'

function PostCard({$id, title, featuredImage, $createdAt, status, isPremium}) {
  let dateString = $createdAt;
  var date = new Date(dateString);
  var options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
  var formattedDate = date.toLocaleDateString('en-US', options).replace(","," ");

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full h-full bg-gray-100 rounded-xl p-5 hover:ring-4 ring-green-500 transition-all cursor-pointer space-y-5 animate__animated animate__fadeIn first:lg:col-span-2 first:md:col-span-3'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl object-cover h-64 w-full'/>
            </div>
            <div className='flex flex-row space-y-2 justify-between'>
              <div>
                <h2 className='font-poppins'>{formattedDate}</h2>
                <h2 className='text-xl font-bold p-2 text-wrap overflow-hidden font-montserrat'>{toTitleCase(title)}</h2>
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