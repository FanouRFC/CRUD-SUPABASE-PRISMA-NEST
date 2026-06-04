import type { user } from "@/types/tableType"
import { axiosConfig } from "../config/axios"

export const userApi = {
    async getUsers(){
        return (await axiosConfig.get("/user")).data
    },
    async getUserByName(name: string){
        return (await axiosConfig.get("/user", {params:{name}})).data
    },
    async addUser(data: Omit<user, "id">){
        return (await axiosConfig.post("/user", data)).data
    },
    async deleteUser(id: number){
        return(await axiosConfig.delete(`/user/${id}`)).data
    },
    async updateUser(id: number, data:{name: string, email: string}){
        return(await axiosConfig.patch(`/user/${id}`, data)).data
    }
}