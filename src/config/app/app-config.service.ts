import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModeEnum } from 'src/common/enum/app-mode.enum';

@Injectable()
export class AppConfigService  {
  public constructor(private readonly configService: ConfigService) {}

  public get appPort(): number {
    return Number(this.configService.get<string>('APP_PORT'));
  }

  public get appMode(): AppModeEnum {
    const appMode=this.configService.get<string>('APP_MODE')
    return AppModeEnum[appMode as string];
  }

  public get appApiPrefix(): string {
    const appPrefix=this.configService.get<string>('APP_PREFIX');
    return appPrefix as string
  }

}
