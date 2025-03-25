import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigurationModule } from "src/config/config.module";
import { PostgresConfigService } from "src/config/postgres/postgres-config.service";

@Module({
    imports:[TypeOrmModule.forRootAsync({
        imports:[ConfigurationModule],
        useFactory:(config:PostgresConfigService)=>({
            type:"postgres",
            host:config.pgHost,
            port:config.pgPort,
            username:config.pgUsername,
            database:config.pgDatabase,
            password:config.pgPassword,
            autoLoadEntities:true,
            synchronize:false,
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            cli: {
                migrationsDir: 'src/migrations',
              },
        }),
        inject:[PostgresConfigService]
    })]
})
export class OrmModule{}