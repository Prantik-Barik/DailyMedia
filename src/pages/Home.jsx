import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/conf"
import { Button, Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'

function Home() {
    const [posts, setPosts] = useState([])

    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            const userPosts = []
            if(posts){
                posts.documents.map((doc) =>{
                    if(doc.userId === localStorage.getItem('currentUser'))
                    {
                        userPosts.push(doc);
                    }
                })
                setPosts(userPosts)
            }
        }).catch((err) => { console.error("Home.jsx Error : ",err) })
    }, [])

  if (posts.length === 0 && !authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center font-poppins">
                <Container>
                    <div className="flex flex-wrap min-h-[50vh] items-center justify-center">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-500 hover:text-[#dd1b5c]">
                                Signup / Login to read posts
                            </h1>
                            <div className='flex flex-col gap-6 pt-4 m-2'>
                                <Link to='/signup'>
                                    <Button bgColor='bg-green-500' className='w-fit py-3 px-5 hover:bg-green-300'>
                                    Signup
                                    </Button>
                                </Link>
                                <Link to='/login'>
                                    <Button bgColor='bg-green-500' className='w-fit py-3 px-6 hover:bg-green-300'>
                                    Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0 && authStatus) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <Spin size='large'/>
            </div>
        )
    }

    return (
        <div className='w-full py-8 md:pt-10'>
            <Container>
                <div className='w-full flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 transition-all duration-200'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home