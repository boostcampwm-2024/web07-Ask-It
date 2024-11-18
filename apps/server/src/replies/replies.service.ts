import { Injectable } from '@nestjs/common';

import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesRepository } from './replies.repository';

import { SessionsService } from '@src/sessions/sessions.service';
import { SessionsAuthRepository } from '@src/sessions-auth/sessions-auth.repository';

@Injectable()
export class RepliesService {
  constructor(
    private readonly repliesRepository: RepliesRepository,
    private readonly sessionService: SessionsService,
    private readonly sessionAuthRepository: SessionsAuthRepository,
  ) {}

  async create(data: CreateReplyDto) {
    return await this.repliesRepository.create(data);
  }

  async updateReply(data: UpdateReplyDto) {
    this.repliesRepository.updateReply(data);
  }

  async deleteReply(data: DeleteReplyDto) {
    this.repliesRepository.deleteReply(data);
  }

  async validateHost(sessionId: string, createUserToken: string) {
    const userId = await this.sessionAuthRepository.findUserByToken(createUserToken);
    if (!userId) return false;
    return await this.sessionService.checkSessionHost(sessionId, userId);
  }

  async toggleLike(replyId: number, createUserToken: string) {
    const exist = await this.repliesRepository.findLike(replyId, createUserToken);
    if (exist) await this.repliesRepository.deleteLike(exist.reply_like_id);
    else await this.repliesRepository.createLike(replyId, createUserToken);
    return { liked: !exist };
  }

  async getLikesCount(replyId: number) {
    return this.repliesRepository.getLikesCount(replyId);
  }
}
