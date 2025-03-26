import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  public constructor(private readonly configService: ConfigService) { }

  public get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') as string
  }

  public get jwtExpiration(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME') as string
  }
}