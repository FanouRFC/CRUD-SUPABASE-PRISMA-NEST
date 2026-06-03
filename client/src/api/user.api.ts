import { axiosConfig } from "../config/axios"

export const userApi = {
    async getUsers(){
        return (await axiosConfig.get("/user")).data
    },
    async getUserByName(name: string){
        return (await axiosConfig.get("/user", {params:{name}})).data
    }
}