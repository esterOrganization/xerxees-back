import { Global, Module } from "@nestjs/common";
import { ConfigurationModule } from "src/config/config.module";
import { PostgresProvider } from "./postgres.provider";

@Global()
@Module({
    imports:[ConfigurationModule
    //     TypeOrmModule.forRootAsync({
    //     imports:[ConfigurationModule],
    //     useFactory:(config:PostgresConfigService)=>({
    //         type:"postgres",
    //         host:config.pgHost,
    //         port:config.pgPort,
    //         username:config.pgUsername,
    //         database:config.pgDatabase,
    //         password:config.pgPassword,
    //         autoLoadEntities:true,
    //         synchronize:false,
    //         migrations: [__dirname + '/migrations/*{.ts,.js}'],
    //         cli: {
    //             migrationsDir: 'src/migrations',
    //           },
    //     }),
    //     inject:[PostgresConfigService]
    // })
],
providers:[PostgresProvider],
exports:[PostgresProvider]
})
export class OrmModule{}