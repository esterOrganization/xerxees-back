import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserRegisterDto } from "../dto/user-register.dto";
import { UserEntity } from "../entities/user.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UseJwtGuard } from "src/common/functions/user-jwt-guard.function";

@ApiTags("[USERS]")
@Controller("users")
export class UserController {
    public constructor(private readonly userService:UserService) {}

    @ApiOperation({summary:"Register a new user"})
    @Post("register")
    public async registerUser(@Body() registerUserDto:UserRegisterDto):Promise<string>
    {
      return await this.userService.registerUser(registerUserDto)
    }

    @ApiOperation({summary:"Login a user"})
    @Post("login")
    public  async loginUser(@Body() loginUserDto:UserRegisterDto):Promise<string>
    {
      return await this.userService.loginUser(loginUserDto)
    }
}