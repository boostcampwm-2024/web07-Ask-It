import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { ToggleReplyLikeDto } from './dto/toggle-reply-like.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ReplyExistenceGuard } from './guards/reply-existence.guard';
import { ReplyOwnershipGuard } from './guards/reply-ownership.guard';
import { RepliesService } from './replies.service';
import { CreateReplySwagger } from './swagger/create-reply.swagger';
import { DeleteReplySwagger } from './swagger/delete-reply.swagger';
import { ToggleReplyLikeSwagger } from './swagger/toggle-reply.swagger';
import { UpdateReplySwagger } from './swagger/update-reply.swagger';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

import { SessionTokenValidationGuard } from '@src/common/guards/session-token-validation.guard';
import { QuestionExistenceGuard } from '@src/questions/guards/question-existence.guard';

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
    const [reply_id, is_host] = await Promise.all([
      this.repliesService.create(createReplyDto),
      this.repliesService.validateHost(createReplyDto.session_id, createReplyDto.create_user_token),
    ]);
    return { reply_id, is_host };
  }

  @Patch()
  @UpdateReplySwagger()
  @ApiBody({ type: UpdateReplyDto })
  @UseGuards(SessionTokenValidationGuard, ReplyExistenceGuard, ReplyOwnershipGuard)
  async update(@Body() updateReplyDto: UpdateReplyDto) {
    await this.repliesService.updateReply(updateReplyDto);
    return {};
  }

  @Delete()
  @DeleteReplySwagger()
  @ApiBody({ type: DeleteReplyDto })
  @UseGuards(SessionTokenValidationGuard, ReplyExistenceGuard, ReplyOwnershipGuard)
  async delete(@Body() deleteReplyDto: DeleteReplyDto) {
    await this.repliesService.deleteReply(deleteReplyDto);
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
