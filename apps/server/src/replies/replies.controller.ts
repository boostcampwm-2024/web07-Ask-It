import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { QuestionExistenceGuard } from '@src/questions/guards/question-existence.guard';

import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { ToggleReplyLikeDto } from './dto/toggle-reply-like.dto';
import { UpdateReplyBodyDto } from './dto/update-reply.dto';
import { ReplyExistenceGuard } from './guards/reply-existence.guard';
import { ReplyOwnershipGuard } from './guards/reply-ownership.guard';
import { RepliesService } from './replies.service';
import { CreateReplySwagger } from './swagger/create-reply.swagger';
import { DeleteReplySwagger } from './swagger/delete-reply.swagger';
import { ToggleReplyLikeSwagger } from './swagger/toggle-reply.swagger';
import { UpdateReplySwagger } from './swagger/update-reply.swagger';

@ApiTags('Replies')
@UseInterceptors(TransformInterceptor)
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @CreateReplySwagger()
  @ApiBody({ type: CreateReplyDto })
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard)
  async create(@Body() createReplyDto: CreateReplyDto) {
    const [reply, isHost] = await Promise.all([
      this.repliesService.createReply(createReplyDto),
      this.repliesService.validateHost(createReplyDto.sessionId, createReplyDto.token),
    ]);
    return { reply: { ...reply, isHost } };
  }

  @Patch(':replyId/body')
  @UpdateReplySwagger()
  @ApiBody({ type: UpdateReplyBodyDto })
  @UseGuards(SessionTokenValidationGuard, ReplyExistenceGuard, ReplyOwnershipGuard)
  async update(@Param('replyId', ParseIntPipe) replyId: number, @Body() updateReplyBodyDto: UpdateReplyBodyDto) {
    const updatedReply = await this.repliesService.updateBody(replyId, updateReplyBodyDto);
    return { reply: updatedReply };
  }

  @Delete(':replyId')
  @DeleteReplySwagger()
  @UseGuards(SessionTokenValidationGuard, ReplyExistenceGuard, ReplyOwnershipGuard)
  async delete(@Param('replyId', ParseIntPipe) replyId: number) {
    await this.repliesService.deleteReply(replyId);
    return {};
  }

  @Post(':replyId/likes')
  @ToggleReplyLikeSwagger()
  @UseGuards(SessionTokenValidationGuard)
  async toggleLike(@Param('replyId', ParseIntPipe) replyId: number, @Body() toggleReplyLikeDto: ToggleReplyLikeDto) {
    const { liked } = await this.repliesService.toggleLike(replyId, toggleReplyLikeDto.token);
    const likesCount = await this.repliesService.getLikesCount(replyId);
    return { liked, likesCount };
  }
}
