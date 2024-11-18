import { Injectable } from '@nestjs/common';

import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyBodyDto } from './dto/update-reply.dto';
import { RepliesRepository } from './replies.repository';

import { SessionsService } from '@sessions/sessions.service';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Injectable()
export class RepliesService {
  constructor(
    private readonly repliesRepository: RepliesRepository,
    private readonly sessionService: SessionsService,
    private readonly sessionAuthRepository: SessionsAuthRepository,
  ) {}

  async createReply(data: CreateReplyDto) {
    const { replyId, body, createdAt, createUserTokenEntity } = await this.repliesRepository.createReply(data);
    return {
      replyId,
      body,
      createdAt,
      isOwner: true,
      likesCount: 0,
      liked: false,
      nickname: createUserTokenEntity?.user?.nickname || '익명',
    };
  }

  async updateBody(replyId: number, updateReplyBodyDto: UpdateReplyBodyDto) {
    const { body } = updateReplyBodyDto;
    return await this.repliesRepository.updateBody(replyId, body);
  }

  async deleteReply(replyId: number) {
    return await this.repliesRepository.deleteReply(replyId);
  }

  async validateHost(sessionId: string, createUserToken: string) {
    const userId = await this.sessionAuthRepository.findUserByToken(createUserToken);
    if (!userId) return false;
    return await this.sessionService.checkSessionHost(sessionId, userId);
  }

  async toggleLike(replyId: number, createUserToken: string) {
    const exist = await this.repliesRepository.findLike(replyId, createUserToken);
    if (exist) await this.repliesRepository.deleteLike(exist.replyLikeId);
    else await this.repliesRepository.createLike(replyId, createUserToken);
    return { liked: !exist };
  }

  async getLikesCount(replyId: number) {
    return this.repliesRepository.getLikesCount(replyId);
  }
}
