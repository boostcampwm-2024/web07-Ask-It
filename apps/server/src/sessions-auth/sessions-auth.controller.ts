import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SessionAuthDto } from './dto/session-auth.dto';
import { SessionsAuthService } from './sessions-auth.service';
import { AuthSessionsSwagger } from './swagger/sessions-auth.swagger';

import { JwtPayloadInterceptor } from '@common/interceptors/jwt-payload.interceptor';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
@ApiTags('session-auth')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(JwtPayloadInterceptor)
@Controller('sessions-auth')
export class SessionsAuthController {
  constructor(private readonly sessionsAuthService: SessionsAuthService) {}

  @Get()
  @AuthSessionsSwagger()
  async checkToken(@Query() sessionAuthDto: SessionAuthDto, @Req() request: Request) {
    const user_id = request['user']?.userId ? Number(request['user'].userId) : null;
    return { token: await this.sessionsAuthService.validateOrCreateToken(sessionAuthDto, user_id) };
  }
}
