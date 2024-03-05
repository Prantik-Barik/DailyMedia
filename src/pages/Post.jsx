import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { toTitleCase } from '../features/toTitleCase'
import { createdAt } from "../features/createdAt";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then(async (status) => {
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className=" max-w-full mx-auto min-h-screen py-8 font-montserrat">
            <Container>
                <div className="w-full my-3 pl-10 flex flex-wrap flex-col gap-3">
                    <h1 className="text-3xl font-bold text-white ">{toTitleCase(post.title)}</h1>
                    <p className="text-sm font-bold text-[#dd1b5c]">{createdAt(post.$createdAt)} By {post.userName}</p>
                </div>

                <div className="flex flex-col justify-center my-10 items-center">
                    <div className="w-9/12 h-70vh flex justify-center mb-4 relative border rounded-xl p-2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl object-cover object-center"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="browser-css text-xl pl-10 text-white py-5">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}