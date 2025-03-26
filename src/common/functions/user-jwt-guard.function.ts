import { AuthGuard } from '@nestjs/passport';
import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from '@nestjs/swagger';

export function UseJwtGuard() {
  return applyDecorators(
    UseGuards(AuthGuard("jwt")),
    ApiBearerAuth("access-token")
  )
}