import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.AppwriteURL)
        .setProject(config.AppwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}) {
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount)
            {
                await this.login({email,password});
                return true
            }

            else
            {
                return userAccount;
            }
        }
        catch(error){
            console.log("Appwrite Service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }
        catch(error){
            console.log("Appwrite Service :: Login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try{
            return await this.account.get();
        }
        catch(error)
        {
            console.log("Appwrite service :: getCurrentUser",error);
        }

        return null;
    }

    async logout() {
        try{
            await this.account.deleteSessions();
        }
        catch(error)
        {
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService