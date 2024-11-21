import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateReplyDto } from './dto/create-reply.dto';
import { ToggleReplyLikeDto } from './dto/toggle-reply-like.dto';
import { UpdateReplyBodyDto } from './dto/update-reply.dto';
import { ReplyExistenceGuard } from './guards/reply-existence.guard';
import { ReplyOwnershipGuard } from './guards/reply-ownership.guard';
import { RepliesService } from './replies.service';
import { CreateReplySwagger } from './swagger/create-reply.swagger';
import { DeleteReplySwagger } from './swagger/delete-reply.swagger';
import { ToggleReplyLikeSwagger } from './swagger/toggle-reply.swagger';
import { UpdateReplySwagger } from './swagger/update-reply.swagger';

import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { QuestionExistenceGuard } from '@questions/guards/question-existence.guard';
import { SocketGateway } from '@socket/socket.gateway';
import { BaseDto } from '@src/common/base.dto';

@ApiTags('Replies')
@UseInterceptors(TransformInterceptor)
@Controller('replies')
export class RepliesController {
  constructor(
    private readonly repliesService: RepliesService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Post()
  @CreateReplySwagger()
  @ApiBody({ type: CreateReplyDto })
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard)
  async create(@Body() createReplyDto: CreateReplyDto) {
    const [reply, isHost] = await Promise.all([
      this.repliesService.createReply(createReplyDto),
      this.repliesService.validateHost(createReplyDto.sessionId, createReplyDto.token),
    ]);
    const resultForOwner = { reply: { ...reply, isHost } };
    const resultForOther = { reply: { ...reply, isHost, isOwner: false } };
    const { sessionId, token } = createReplyDto;
    this.socketGateway.broadcastNewReply(sessionId, token, resultForOther);
    return resultForOwner;
  }

  @Patch(':replyId/body')
  @UpdateReplySwagger()
  @ApiBody({ type: UpdateReplyBodyDto })
  @UseGuards(SessionTokenValidationGuard, ReplyExistenceGuard, ReplyOwnershipGuard)
  async update(@Param('replyId', ParseIntPipe) replyId: number, @Body() updateReplyBodyDto: UpdateReplyBodyDto) {
    const updatedReply = await this.repliesService.updateBody(replyId, updateReplyBodyDto);
    const { sessionId, token } = updateReplyBodyDto;
    const result = { reply: updatedReply };
    this.socketGateway.broadcastReplyUpdate(sessionId, token, result);
    return result;
  }

  @Delete(':replyId')
  @DeleteReplySwagger()
  @UseGuards(SessionTokenValidationGuard, ReplyExistenceGuard, ReplyOwnershipGuard)
  async delete(@Param('replyId', ParseIntPipe) replyId: number, @Query() data: BaseDto) {
    const { questionId } = await this.repliesService.deleteReply(replyId);
    const { sessionId, token } = data;
    const resultForOther = { replyId, questionId };
    this.socketGateway.broadcastReplyDelete(sessionId, token, resultForOther);
    return {};
  }

  @Post(':replyId/likes')
  @ToggleReplyLikeSwagger()
  @UseGuards(SessionTokenValidationGuard)
  async toggleLike(@Param('replyId', ParseIntPipe) replyId: number, @Body() toggleReplyLikeDto: ToggleReplyLikeDto) {
    const { liked, questionId } = await this.repliesService.toggleLike(replyId, toggleReplyLikeDto.token);
    const likesCount = await this.repliesService.getLikesCount(replyId);
    const { sessionId, token } = toggleReplyLikeDto;
    const resultForOwner = { liked, likesCount };
    const resultForOther = { replyId, liked: false, likesCount, questionId };
    this.socketGateway.broadcastReplyLike(sessionId, token, resultForOther);
    return resultForOwner;
  }
}
