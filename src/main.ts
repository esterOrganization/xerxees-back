import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigService } from './config/swagger/swagger-config.service';
import { AppConfigService } from './config/app/app-config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Implement Swagger 
  const swaggerConfigService:SwaggerConfigService=app.get<SwaggerConfigService>(SwaggerConfigService)
  swaggerConfigService.initialize(app)
  
  const appConfigService:AppConfigService=app.get<AppConfigService>(AppConfigService)

  await app.listen(appConfigService.appPort).then(res=>{
    Logger.log(`Application Running on Port: ${appConfigService.appPort}`)
    Logger.log(`Open For Documentation: http://localhost:${appConfigService.appPort}/${swaggerConfigService.swaggerPrefix}`)
  });
}
bootstrap();
