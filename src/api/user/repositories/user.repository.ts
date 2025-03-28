import { Inject, Injectable } from "@nestjs/common";
import { PostgresProviderConstant } from "src/orm/postgres-provider.constant";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserRegisterDto } from "../dto/user-register.dto";
import { WalletEntity } from "src/api/wallet/entities/wallet.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity>{
  constructor(@Inject(PostgresProviderConstant) private postgresDataSource:DataSource) {
    super(UserEntity,postgresDataSource.createEntityManager());
  }

  public async registerUser(registerUserDto:UserRegisterDto):Promise<UserEntity>
  {
    const instance=this.create({
      email:registerUserDto.email,
      password:registerUserDto.password,
      firstName:registerUserDto.firstName,
      lastName:registerUserDto.lastName,
      userName:registerUserDto.userName
    })

    return await this.save(instance)
  }

  public async assignWalletToUser(userId:string,wallet:WalletEntity):Promise<void>
  {
    await this.update(userId,{Wallet:wallet})
  }

  public async findUserByEmail(email:string):Promise<UserEntity | null>
  {
    return await this.findOne({
      where:{
        email
      }
    })
  }

  public async registerUserByGoogleAccount(email:string):Promise<UserEntity>
  {
    const userInstance=this.create({
      email,
      userName:email
    })
    return await this.save(userInstance)
  }
}