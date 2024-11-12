import { Injectable } from '@nestjs/common';

import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesRepository } from './replies.repository';

@Injectable()
export class RepliesService {
  constructor(private readonly repliesRepository: RepliesRepository) {}
  async create(data: CreateReplyDto) {
    const replyCreateData: any = { ...data };
    replyCreateData.question_id = Number(data.question_id);

    return await this.repliesRepository.create(replyCreateData);
  }

  async update(data: UpdateReplyDto) {
    //사용자 자격 검증 로직
    const replyUpdateData: any = { ...data };
    replyUpdateData.question_id = Number(data.question_id);
    replyUpdateData.reply_id = Number(data.reply_id);

    this.repliesRepository.update(replyUpdateData);
  }

  async delete(data: DeleteReplyDto) {
    //사용자 자격 검증 로직
    const replyDeleteData: any = { ...data };
    replyDeleteData.question_id = Number(data.question_id);
    replyDeleteData.reply_id = Number(data.reply_id);
    this.repliesRepository.delete(replyDeleteData);
  }
}
