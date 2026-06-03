import { axiosConfig } from "../config/axios"

export const postApi = {
    async getPosts(){
        return (await axiosConfig.get("/post")).data
    },
    async getPostByTitle(title: string){
        return (await axiosConfig.get("/post", {params:{title}})).data
    }
}