const config = {
    AppwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    AppwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceapikey : String(import.meta.env.VITE_RTE_API_KEY),
    stripe_key : String(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
}

export default config