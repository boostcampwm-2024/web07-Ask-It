import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';
import { CreateSessionSwagger } from './swagger/create-session.swagger';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('Sessions')
@UseInterceptors(TransformInterceptor)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @CreateSessionSwagger.ApiOperation
  @CreateSessionSwagger.ApiResponse201
  @CreateSessionSwagger.ApiResponse400
  @ApiBody({ type: CreateSessionDto })
  async create(@Body() createSessionDto: CreateSessionDto) {
    const sessionData = await this.sessionsService.create(createSessionDto);
    return { sessionId: sessionData.sessionId };
  }
}
