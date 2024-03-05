import React ,{useState, useEffect} from 'react'
import appwriteService from "../appwrite/conf"
import { Container, PostCard} from '../components/index'
import { Spin } from 'antd'

function AllPosts() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    appwriteService.getPosts().then((posts)=>{
      if(posts){
          setPosts(posts.documents)
      }
    })
    .catch((error)=>{ console.log(error)})
  },[])

  if (posts.length == 0) {
    return (
        <div className='h-[70vh] flex justify-center items-center'>
            <Spin size='large'/>
        </div>
    )
  }

    return (
        <div className='w-full py-8 md:pt-10'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts