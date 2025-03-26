import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public password:string
}