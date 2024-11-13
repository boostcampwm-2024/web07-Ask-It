import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SessionAuthDto } from './dto/session-auth.dto';
import { SessionsAuthService } from './sessions-auth.service';
import { AuthSessionsSwagger } from './swagger/sessions-auth.swagger';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
@ApiTags('session-auth')
@UseInterceptors(TransformInterceptor)
@Controller('sessions-auth')
export class SessionsAuthController {
  constructor(private readonly sessionsAuthService: SessionsAuthService) {}

  @Get()
  @AuthSessionsSwagger()
  async checkToken(@Query() sessionAuthDto: SessionAuthDto) {
    return {
      token: await this.sessionsAuthService.validateOrCreateToken(sessionAuthDto),
    };
  }
}
