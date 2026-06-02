import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AddPostDTO{
    @IsString()
    title: string

    @IsString()
    content: string

    @IsBoolean()
    published: boolean

    @IsNumber()
    authorId: number
}