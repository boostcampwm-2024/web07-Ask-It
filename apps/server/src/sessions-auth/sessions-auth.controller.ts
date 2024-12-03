import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SessionAuthDto } from './dto/session-auth.dto';
import { UpdateHostDto } from './dto/update-host.dto';
import { SessionsAuthService } from './sessions-auth.service';
import { AuthSessionsSwagger } from './swagger/sessions-auth.swagger';
import { SessionsHostSwagger } from './swagger/sessions-host.swagger';
import { SessionsUserSwagger } from './swagger/sessions-user.swagger';

import { BaseDto } from '@common/base.dto';
import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { JwtPayloadInterceptor } from '@common/interceptors/jwt-payload.interceptor';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { requestSocket } from '@common/request-socket';
import { SOCKET_EVENTS } from '@socket/socket.constant';

@ApiTags('sessions-auth')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(JwtPayloadInterceptor)
@Controller('sessions-auth')
export class SessionsAuthController {
  constructor(private readonly sessionsAuthService: SessionsAuthService) {}

  @Get()
  @AuthSessionsSwagger()
  async checkToken(@Query() sessionAuthDto: SessionAuthDto, @Req() request: Request) {
    const userId = request['user']?.userId ? Number(request['user'].userId) : null;
    return { token: await this.sessionsAuthService.validateOrCreateToken(sessionAuthDto, userId) };
  }

  @Get('users')
  @SessionsUserSwagger()
  @UseGuards(SessionTokenValidationGuard)
  async getUserInfo(@Query() { sessionId }: BaseDto) {
    const users = await this.sessionsAuthService.findUsers(sessionId);
    return { users };
  }

  @Patch('host/:userId')
  @SessionsHostSwagger()
  @UseGuards(SessionTokenValidationGuard)
  async authorizeHost(@Param('userId', ParseIntPipe) userId: number, @Body() data: UpdateHostDto) {
    const { sessionId, token } = data;
    const result = { user: await this.sessionsAuthService.authorizeHost(userId, data) };
    const event = SOCKET_EVENTS.HOST_CHANGED;
    await requestSocket({ sessionId, token, event, content: result });
    return result;
  }
}
