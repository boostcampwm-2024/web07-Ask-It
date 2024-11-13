import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';
import { CreateSessionSwagger } from './swagger/create-session.swagger';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('Sessions')
@UseInterceptors(TransformInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @CreateSessionSwagger()
  @ApiBody({ type: CreateSessionDto })
  async create(@Body() createSessionDto: CreateSessionDto, @Req() request: Request) {
    const userId = request['user'].userId;
    const sessionData = await this.sessionsService.create(createSessionDto, userId);
    return { sessionId: sessionData.sessionId };
  }
}
