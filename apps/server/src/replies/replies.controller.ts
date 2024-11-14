import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { ToggleReplyLikeDto } from './dto/toggle-reply-like.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesService } from './replies.service';
import { CreateReplySwagger } from './swagger/create-reply.swagger';
import { DeleteReplySwagger } from './swagger/delete-reply.swagger';
import { ToggleReplyLikeSwagger } from './swagger/toggle-reply.swagger';
import { UpdateReplySwagger } from './swagger/update-reply.swagger';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

import { SessionTokenValidationGuard } from '@src/common/guards/session-token-validation.guard';

@ApiTags('Replies')
@UseInterceptors(TransformInterceptor)
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @CreateReplySwagger()
  @ApiBody({ type: CreateReplyDto })
  @UseGuards(SessionTokenValidationGuard)
  async create(@Body() createReplyDto: CreateReplyDto) {
    return { reply_id: await this.repliesService.create(createReplyDto) };
  }

  @Patch()
  @UpdateReplySwagger()
  @ApiBody({ type: UpdateReplyDto })
  @UseGuards(SessionTokenValidationGuard)
  async update(@Body() updateReplyDto: UpdateReplyDto) {
    await this.repliesService.update(updateReplyDto);
    return {};
  }

  @Delete()
  @DeleteReplySwagger()
  @ApiBody({ type: DeleteReplyDto })
  @UseGuards(SessionTokenValidationGuard)
  async delete(@Body() deleteReplyDto: DeleteReplyDto) {
    await this.repliesService.delete(deleteReplyDto);
    return {};
  }

  @Post(':id/likes')
  @ToggleReplyLikeSwagger()
  @UseGuards(SessionTokenValidationGuard)
  async toggleLike(@Param('id', ParseIntPipe) replyId: number, @Body() toggleReplyLikeDto: ToggleReplyLikeDto) {
    const { liked } = await this.repliesService.toggleLike(replyId, toggleReplyLikeDto.create_user_token);
    const likesCount = await this.repliesService.getLikesCount(replyId);
    return { liked, likesCount };
  }
}
