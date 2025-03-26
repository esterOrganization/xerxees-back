import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/common/strategies/jwt.strategy";
import { ConfigurationModule } from "src/config/config.module";
import { JwtConfigService } from "src/config/jwt/jwt-config.service";
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { WalletModule } from "../wallet/wallet.module";

@Module({
    imports:[
        JwtModule.registerAsync({
        global:true,
        imports:[ConfigurationModule],
        inject:[JwtConfigService],
        useFactory:(jwtConfigService:JwtConfigService)=>{
            return {
                secret:jwtConfigService.jwtSecret,
                signOptions:{expiresIn:jwtConfigService.jwtExpiration}
            }
        }
    }),
    WalletModule
    ],
    controllers:[UserController],
    providers:[JwtStrategy,UserRepository,UserService],
    exports:[UserService]
})
export class UserModule{}