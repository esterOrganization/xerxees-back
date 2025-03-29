import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRegisterDto } from "../dto/user-register.dto";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { GoogleStrategyResultInterface } from "src/common/interfaces/google-startegy-result.interface";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { IUserTokenPayload } from "src/common/interfaces/user-token-payload.interface";
import { UserEntity } from "../entities/user.entity";
import { UseJwtGuard } from "src/common/functions/user-jwt-guard.function";
import { WalletEntity } from "src/api/wallet/entities/wallet.entity";

@ApiTags("[USERS]")
@Controller("users")
export class UserController {
  public constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: "Register a new user" })
  @Post("register")
  public async registerUser(@Body() registerUserDto: UserRegisterDto): Promise<string> {
    return await this.userService.registerUser(registerUserDto)
  }

  @ApiOperation({ summary: "Login a user" })
  @Post("login")
  public async loginUser(@Body() loginUserDto: UserRegisterDto): Promise<string> {
    return await this.userService.loginUser(loginUserDto)
  }

  @ApiOperation({ summary: "Google login Request" })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
  }

  @ApiOperation({ summary: "Google login CallBack" })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallBack(@Req() request: Request, @Res() response: Response) {
    await this.userService.handleUserByGoogleAccount((request.user as GoogleStrategyResultInterface).email)
    response.redirect(process.env.FRONT_CALL_BACK as string);
  }


  @ApiOperation({ summary: "User Profile" })
  @UseJwtGuard()
  @Get('me')
  public async me(@GetUser() user: IUserTokenPayload): Promise<UserEntity> {
    return await this.userService.me(user.id)
  }

  @ApiOperation({ summary: "User Profile" })
  @UseJwtGuard()
  @Get('wallet')
  public async userWallet(@GetUser() user: IUserTokenPayload): Promise<WalletEntity> {
    return await this.userService.userWallet(user.id)
  }
}