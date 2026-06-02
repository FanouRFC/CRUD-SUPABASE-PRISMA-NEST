import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdatePostDTO{
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    content: string

    @IsBoolean()
    @IsOptional()
    published: boolean

}