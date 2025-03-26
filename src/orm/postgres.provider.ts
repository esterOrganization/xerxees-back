import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { DataSource } from "typeorm"
import { PostgresProviderConstant } from "./postgres-provider.constant"
import { PostgresConfigService } from "src/config/postgres/postgres-config.service"

export const PostgresProvider:Provider={
    provide:PostgresProviderConstant,
    inject:[PostgresConfigService],
    useFactory:async (config:PostgresConfigService)=>{
        const postgresDataSource=new DataSource({
            type:"postgres",
            host:config.pgHost,
            port:config.pgPort,
            database:config.pgDatabase,
            username:config.pgUsername,
            password:config.pgPassword,
            entities: ['dist/**/*.entity.js', '**/*.entity.js'],
            synchronize:true,
        })
           await postgresDataSource.initialize()
        return postgresDataSource
    }
}