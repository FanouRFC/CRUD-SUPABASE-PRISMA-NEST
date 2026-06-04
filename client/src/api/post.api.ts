import type { post } from "@/types/tableType"
import { axiosConfig } from "../config/axios"

type postApiData = {
  authorId: number;
  content: string;
  title: string;
  published: boolean
};

export const postApi = {
    async getPosts(){
        return (await axiosConfig.get("/post")).data
    },
    async getPostByTitle(title: string){
        return (await axiosConfig.get("/post", {params:{title}})).data
    },
    async addPost(data: postApiData){
        return (await axiosConfig.post("/post", data)).data
    },
    async deletePost(id: number){
        return(await axiosConfig.delete(`/post/${id}`)).data
    },
    async updatePost(id: number, data:{title: string, content: string, published: boolean}){
        return(await axiosConfig.patch(`/post/${id}`, data)).data
    }
}