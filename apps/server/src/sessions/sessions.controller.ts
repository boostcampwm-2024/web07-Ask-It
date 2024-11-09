import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';
import { CreateSessionSwagger } from './swagger/create-session.swagger';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @CreateSessionSwagger.ApiOperation
  @CreateSessionSwagger.ApiResponse201
  @CreateSessionSwagger.ApiResponse400
  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    const data = await this.sessionsService.create(createSessionDto);
    return {
      type: 'success',
      data: {
        sessionId: data.sessionId,
      },
    };
  }
}
