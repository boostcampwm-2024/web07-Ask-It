import { Injectable } from '@nestjs/common';

import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesRepository } from './replies.repository';

@Injectable()
export class RepliesService {
  constructor(private readonly repliesRepository: RepliesRepository) {}
  async create(data: CreateReplyDto) {
    return await this.repliesRepository.create(data);
  }

  async update(data: UpdateReplyDto) {
    //사용자 자격 검증 로직

    this.repliesRepository.update(data);
  }

  async delete(data: DeleteReplyDto) {
    //사용자 자격 검증 로직
    this.repliesRepository.delete(data);
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
