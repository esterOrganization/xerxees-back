import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getEnvPath } from "src/common/functions/env-path.function";
import { envValidationSchema } from "./env-validation.joi";
import { AppConfigService } from "./app/app-config.service";
import { PostgresConfigService } from "./postgres/postgres-config.service";
import { SwaggerConfigService } from "./swagger/swagger-config.service";
import { JwtConfigService } from "./jwt/jwt-config.service";

@Global()
@Module({

    imports:[ConfigModule.forRoot({
        isGlobal:true,
        envFilePath:getEnvPath(),
        validationSchema:envValidationSchema
    })],
    providers:[AppConfigService,PostgresConfigService,SwaggerConfigService,JwtConfigService],
    exports:[AppConfigService,PostgresConfigService,SwaggerConfigService,JwtConfigService]
})
export class ConfigurationModule{}