import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [
    ConfigurationModule,
    OrmModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
