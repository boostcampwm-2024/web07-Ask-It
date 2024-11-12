import { Injectable } from '@nestjs/common';

import { CreateReplyDto } from './dto/create-reply.dto';
import { RepliesRepository } from './replies.repository';

@Injectable()
export class RepliesService {
  constructor(private readonly repliesRepository: RepliesRepository) {}
  async create(data: CreateReplyDto) {
    const replyData: any = { ...data };
    replyData.question_id = Number(data.question_id);

    await this.repliesRepository.create(replyData);
  }
}
