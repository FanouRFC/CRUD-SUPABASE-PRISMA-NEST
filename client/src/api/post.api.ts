import { axiosConfig } from "../config/axios"

export const postApi = {
    async getPosts(){
        return (await axiosConfig.get("/post")).data
    }
}