import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.AppwriteURL)
        .setProject(config.AppwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title, slug, content, featuredImage, status, isPremium, userId}){
        try {
            return await this.databases.createDocument(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    userId,
                    featuredImage,
                    isPremium
                }
            )
        } 
        catch (error) {
            console.log("Appwrite service:: createPost error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status})
    {
        try {
            return await this.databases.updateDocument(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
                )
        } 
        catch (error) {
            console.log("Appwrite service:: updatePost error");
        }
    }

    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite service:: deletePost error");
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                slug
            ) 
        } catch (error) {
            console.log("Appwrite service:: getPost error");
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.AppwriteDatabaseId,
                config.AppwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service:: getPosts error");
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.AppwriteBucketId,
                ID.unique(),
                file
            )
        } 
        catch (error) {
            console.log("Appwrite service:: uploadFile error");
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.AppwriteBucketId,
                fileId,
            )
            return true;
        } 
        catch (error) {
            console.log("Appwrite service:: deleteFile error");
            return false;
        }
    }

    getFilePreview(fileId){
        return  this.bucket.getFilePreview(
            config.AppwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service