import { axiosConfig } from "../config/axios"

export const userApi = {
    async getUsers(){
        return (await axiosConfig.get("/user")).data
    }

}