import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from "../index"

import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/conf'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function PostForm({ post }) 
{
    const { register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug : post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
            isPremium: post?.isPremium || "free",
        }
    })
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    
    const submit = async(data) => {
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage : file ? file.$id : undefined,
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
                toast.success(`${dbPost.title} : Blog updated !!`)
            }
        }
        else
        {
            const file = await appwriteService.uploadFile(data.image[0]);
            
            if(file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.userData.$id, userName : userData.userData.name });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                    toast.success(`${dbPost.title} : Blog posted !!`)
                }

            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string')
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

        return '';
    },[]);

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })

        // Optimise the useEffect
        return ()=> subscription.unsubscribe();
    },[watch, slugTransform, setValue])
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap font-poppins text-[#8c8a9c]">
            <div className="w-2/3 px-2">

                <Input
                    label="Title :"
                    placeholder="Blog Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Blog Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                
                <div>
                    <h1 className='my-3 pl-1 text-lg font-semibold text-green-500'>Publish : </h1>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                </div>
                
                <div>
                    <h1 className='my-3 text-lg font-semibold text-yellow-600'>Premium : </h1>
                    <Select
                    options={["premium", "free"]}
                    label="Premium or Free Content"
                    className="mb-4"
                    {...register("isPremium", { required: true })}
                    />
                </div>
                
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-5">
                    {post ? "Update" : "Save"}
                </Button>
            </div>
        </form>
    );
}