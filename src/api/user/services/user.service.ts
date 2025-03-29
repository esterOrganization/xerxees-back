import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserRegisterDto } from "../dto/user-register.dto";
import { UserEntity } from "../entities/user.entity";
import { sha256 } from "js-sha256";
import { JwtService } from "@nestjs/jwt";
import { IUserTokenPayload } from "src/common/interfaces/user-token-payload.interface";
import { WalletService } from "src/api/wallet/services/wallet.service";
import { UserLoginDto } from "../dto/user-login.dto";

@Injectable()
export class  UserService{
    public constructor(private  readonly userRepository:UserRepository,
      private readonly walletService:WalletService,
      private readonly jwtService:JwtService
    ){}


    public async registerUser(registerUserDto:UserRegisterDto):Promise<string>
    {
      const findDuplicateEmail=await this.userRepository.findUserByEmail(registerUserDto.email)
    
      if(findDuplicateEmail)
      throw new BadRequestException("Email Duplicated...")

      const createdUser= await this.userRepository.registerUser(registerUserDto)
      const createdWallet=await this.walletService.createWallet()
      await this.userRepository.assignWalletToUser(createdUser.id,createdWallet)
      const jwtPayload:IUserTokenPayload={
        id:createdUser.id
      }

      return this.jwtService.sign(jwtPayload)
    }

    public  async loginUser(loginUserDto:UserLoginDto):Promise<string>
    {
      const findUser=await this.userRepository.findUserByEmail(loginUserDto.email)

      if(!findUser)
        throw new BadRequestException("User not found")

      if(findUser.password!==sha256(loginUserDto.password))
        throw new BadRequestException("Password is incorrect")

      const jwtPayload:IUserTokenPayload={
        id:findUser.id
      }

      return this.jwtService.sign(jwtPayload)

    }

    public async handleUserByGoogleAccount(email:string):Promise<string>
    {
      const findUser=await this.userRepository.findUserByEmail(email)
      if(findUser)
      {
        console.log("---------- user exist ---------")
        const jwtPayload:IUserTokenPayload={
          id:findUser.id
        }
        return this.jwtService.sign(jwtPayload)
      }else{
        console.log("---------- user not exist ---------")
        const createdUser=await this.userRepository.registerUserByGoogleAccount(email)
        const createdWallet=await this.walletService.createWallet()
        await this.userRepository.assignWalletToUser(createdUser.id,createdWallet)
        const jwtPayload:IUserTokenPayload={
          id:createdUser.id
        }
        return this.jwtService.sign(jwtPayload)
      }
    }

    public async me(id:string):Promise<UserEntity>
    {
      return await this.userRepository.me(id)
    }
}