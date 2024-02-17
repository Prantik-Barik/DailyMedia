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
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/3'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts