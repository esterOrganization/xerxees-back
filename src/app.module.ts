import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { OrmModule } from './orm/orm.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigurationModule,
    OrmModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
