import { Body, Controller, Post } from '@nestjs/common';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    await this.sessionsService.create(createSessionDto);
    return {
      type: 'success',
      data: {},
    };
  }
}
