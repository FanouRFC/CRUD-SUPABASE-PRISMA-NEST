import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostDTO } from './dto/add.post.dto';
import { UpdatePostDTO } from './dto/update.post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}
    @Get("")
    getPosts(){
        return this.postService.getPosts()
    }

    @Post("")
    createPost(@Body(new ValidationPipe) body : AddPostDTO){
        return this.postService.addPost(body)
    }

    @Delete(":id")
    deletePost(@Param("id", ParseIntPipe) id : number){
        return this.postService.deletePost(id)
    }

    @Patch(":id")
    UpdatePost(@Param("id", ParseIntPipe) id: number, @Body(new ValidationPipe) body : UpdatePostDTO){
        return this.postService.updatePost(id, body)
    }

}
