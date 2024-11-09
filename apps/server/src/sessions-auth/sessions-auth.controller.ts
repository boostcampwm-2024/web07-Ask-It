import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SessionAuthDto } from './dto/session-auth.dto';
import { SessionsAuthService } from './sessions-auth.service';

@ApiTags('session-auth')
@Controller('sessions-auth')
export class SessionsAuthController {
  constructor(private readonly sessionsAuthService: SessionsAuthService) {}

  @Get()
  async checkToken(@Query() sessionAuthDto: SessionAuthDto) {
    return {
      type: 'success',
      data: {
        token: await this.sessionsAuthService.validateOrCreateToken(sessionAuthDto),
      },
    };
  }
}
