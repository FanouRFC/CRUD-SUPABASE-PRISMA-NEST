import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdatePostDTO } from './dto/update.post.dto';
import { AddPostDTO } from './dto/add.post.dto';

@Injectable()
export class PostService {
    constructor(private prismaService : PrismaService){}

    async getPosts(){
        return this.prismaService.post.findMany()
    }

    async addPost(data: AddPostDTO){
        return this.prismaService.post.create({
            data:{
                title: data.title,
                content: data.content,
                published: data.published,
                author: {
                    connect: {id: data.authorId}
                }
            }
        })
    }

    async deletePost(id: number){
        return this.prismaService.post.delete({where:{id}})
    }

    async updatePost(id: number, data: UpdatePostDTO){
        return this.prismaService.post.update({where:{id}, data})
    }
}
