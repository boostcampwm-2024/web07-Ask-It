import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { ToggleReplyLikeDto } from './dto/toggle-reply-like.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesService } from './replies.service';
import { CreateReplySwagger } from './swagger/create-reply.swagger';
import { DeleteReplySwagger } from './swagger/delete-reply.swagger';
import { UpdateReplySwagger } from './swagger/update-reply.swagger';
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
    return { reply_id: await this.repliesService.create(createReplyDto) };
  }

  @Patch()
  @UpdateReplySwagger()
  @ApiBody({ type: UpdateReplyDto })
  async update(@Body() updateReplyDto: UpdateReplyDto) {
    await this.repliesService.update(updateReplyDto);
    return {};
  }

  @Delete()
  @DeleteReplySwagger()
  @ApiBody({ type: DeleteReplyDto })
  async delete(@Body() deleteReplyDto: DeleteReplyDto) {
    await this.repliesService.delete(deleteReplyDto);
    return {};
  }

  @Post(':id/likes')
  async toggleLike(@Param('id', ParseIntPipe) replyId: number, @Body() toggleReplyLikeDto: ToggleReplyLikeDto) {
    const { liked } = await this.repliesService.toggleLike(replyId, toggleReplyLikeDto.create_user_token);
    const likesCount = await this.repliesService.getLikesCount(replyId);
    return { liked, likesCount };
  }
}
