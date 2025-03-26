import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserRegisterDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public password:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    userName?:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName?:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName?:string
}
