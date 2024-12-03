import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
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
import { requestSocket } from '@common/request-socket';
import { QuestionExistenceGuard } from '@questions/guards/question-existence.guard';
import { SOCKET_EVENTS } from '@socket/socket.constant';
import { BaseDto } from '@src/common/base.dto';

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
      this.repliesService.validateHost(createReplyDto.token),
    ]);
    const resultForOwner = { reply: { ...reply, isHost } };
    const resultForOther = { reply: { ...reply, isHost, isOwner: false } };
    const { sessionId, token } = createReplyDto;
    await requestSocket({ sessionId, token, event: SOCKET_EVENTS.REPLY_CREATED, content: resultForOther });
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
    await requestSocket({ sessionId, token, event: SOCKET_EVENTS.REPLY_UPDATED, content: result });
    return result;
  }

  @Delete(':replyId')
  @DeleteReplySwagger()
  @UseGuards(SessionTokenValidationGuard, ReplyExistenceGuard)
  async delete(@Param('replyId', ParseIntPipe) replyId: number, @Query() data: BaseDto, @Req() request: Request) {
    const { sessionId, token } = data;
    const { questionId } = await this.repliesService.deleteReply(replyId, token, request['reply']);
    const resultForOther = { replyId, questionId };
    await requestSocket({ sessionId, token, event: SOCKET_EVENTS.REPLY_DELETED, content: resultForOther });
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
    const event = SOCKET_EVENTS.REPLY_LIKED;
    await requestSocket({ sessionId, token, event, content: resultForOther });
    return resultForOwner;
  }
}
