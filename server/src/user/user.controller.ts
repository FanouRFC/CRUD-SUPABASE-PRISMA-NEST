import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get("")
    getUsers(@Query("name") query?: string){
        if(query){
            return this.userService.getUserByName(query)
        }
        return this.userService.getUsers()
    }

    @Post("")
    createUser(@Body(new ValidationPipe) body : CreateUserDTO){
        return this.userService.createUser(body)
    }

    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) id){
        return this.userService.deleteUser(id)
    }

    @Patch(":id")
    updateUser(@Param("id", ParseIntPipe) id, @Body(new ValidationPipe) data: UpdateUserDTO){
        return this.userService.updateUser(id, data)
    }
}
