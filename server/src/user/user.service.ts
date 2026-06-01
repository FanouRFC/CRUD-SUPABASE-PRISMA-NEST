import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}
    async getUsers() {
        return this.prismaService.user.findMany()
    }

    async createUser(data: CreateUserDTO){
        return this.prismaService.user.create({
            data:data
        })
    }

    async deleteUser(id: number){
        return this.prismaService.user.delete({where: {id}})
    }

    async updateUser(id: number, data: UpdateUserDTO){
        return this.prismaService.user.update({
            where:{id},
            data
        })
    }
}
