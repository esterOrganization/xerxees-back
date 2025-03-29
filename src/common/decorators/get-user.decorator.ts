import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IUserTokenPayload } from '../interfaces/user-token-payload.interface';


export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): IUserTokenPayload => {
  const request: Request = ctx.switchToHttp().getRequest();

  const operatorProfile = request.headers['x-custom-cookie'] as string;

  const user: IUserTokenPayload = request['user'] as IUserTokenPayload

  return user;
});
