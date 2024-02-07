import React from 'react'
import appwriteService from '../appwrite/conf'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage, userId}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
            </div>
            <div>
              <h2>{userId}</h2>
              <h2>{title}</h2>
            </div>
            
        </div>
    </Link>
  )
}

export default PostCard