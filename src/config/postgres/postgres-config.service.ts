import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get pgHost(): string {
    return this.configService.get<string>('PG_HOST') as string
  }

  public get pgPort(): number {
    return Number(this.configService.get<string>('PG_PORT') as string)
  }

  public get pgUsername(): string {
    return this.configService.get<string>('PG_USERNAME') as string
  }

  public get pgPassword(): string {
    return this.configService.get<string>('PG_PASSWORD') as string
  }

  public get pgDatabase(): string {
    return this.configService.get<string>('PG_DATABASE') as string
  }
}
