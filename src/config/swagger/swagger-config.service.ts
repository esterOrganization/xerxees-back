import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerConfigService {
  public constructor(private readonly configService: ConfigService) { }

  public get swaggerTitle(): string {
    return this.configService.get<string>('SG_TITLE') as string
  }

  public get swaggerDescription(): string {
    return this.configService.get<string>('SG_DESCRIPTION') as string
  }

  public get swaggerVersion(): string {
    return this.configService.get<string>('SG_VERSION') as string
  }

  public get swaggerTag(): string {
    return this.configService.get<string>('SG_TAG') as string
  }

  public get swaggerPrefix(): string {
    return this.configService.get<string>('SG_PREFIX') as string
  }

  public initialize(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle(this.swaggerTitle)
      .setDescription(this.swaggerDescription)
      .setVersion(this.swaggerVersion)
      .addTag(this.swaggerTag)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(this.swaggerPrefix, app, document);
  }
}