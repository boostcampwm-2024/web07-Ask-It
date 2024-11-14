import { Injectable } from '@nestjs/common';

import { DatabaseException } from '../common/exceptions/resource.exception';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class RepliesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateReplyDto) {
    try {
      return (await this.prisma.reply.create({ data })).reply_id;
    } catch (error) {
      throw DatabaseException.create('Reply');
    }
  }

  async update(data: UpdateReplyDto) {
    try {
      return await this.prisma.reply.updateMany({
        where: {
          session_id: data.session_id,
          question_id: data.question_id,
          reply_id: data.reply_id,
        },
        data: {
          body: data.body,
        },
      });
    } catch (error) {
      throw DatabaseException.delete('reply');
    }
  }

  async delete(data: DeleteReplyDto) {
    try {
      return await this.prisma.reply.deleteMany({
        where: {
          session_id: data.session_id,
          question_id: data.question_id,
          reply_id: data.reply_id,
        },
      });
    } catch (error) {
      throw DatabaseException.delete('reply');
    }
  }
}
