import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateReplyDto } from './dto/create-reply.dto';
import { RepliesService } from './replies.service';
import { CreateReplySwagger } from './swagger/create-reply.swagger';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('Replies')
@UseInterceptors(TransformInterceptor)
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @CreateReplySwagger()
  @ApiBody({ type: CreateReplyDto })
  async create(@Body() createReplyDto: CreateReplyDto) {
    await this.repliesService.create(createReplyDto);
    return {};
  }
}
