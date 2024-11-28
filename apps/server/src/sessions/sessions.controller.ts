import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateSessionDto } from './dto/create-session.dto';
import { TerminateSessionDto } from './dto/terminate-session.dto';
import { SessionsService } from './sessions.service';
import { CreateSessionSwagger } from './swagger/create-session.swagger';
import { GetSessionSwagger } from './swagger/get-session.swagger';
import { TerminateSessionSwagger } from './swagger/terminate-session.swagger';

import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { SocketGateway } from '@socket/socket.gateway';

@ApiTags('Sessions')
@UseInterceptors(TransformInterceptor)
@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateSessionSwagger()
  @ApiBody({ type: CreateSessionDto })
  async create(@Body() createSessionDto: CreateSessionDto, @Req() request: Request) {
    const userId = request['user'].userId;
    const sessionData = await this.sessionsService.create(createSessionDto, userId);
    return { sessionId: sessionData.sessionId };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @GetSessionSwagger()
  async getSessionsById(@Req() request: Request) {
    const userId = request['user'].userId;
    const sessionData = await this.sessionsService.getSessionsById(userId);
    return { sessionData };
  }

  @Post(':sessionId/terminate')
  @HttpCode(200)
  @TerminateSessionSwagger()
  @UseGuards(SessionTokenValidationGuard)
  async terminateSession(@Param('sessionId') sessionId: string, @Body() { token }: TerminateSessionDto) {
    const result = await this.sessionsService.terminateSession(sessionId, token);
    this.socketGateway.broadcastSessionEnd(sessionId, token, result);
    return result;
  }
}
