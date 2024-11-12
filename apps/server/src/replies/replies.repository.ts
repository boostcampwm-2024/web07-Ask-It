import { Injectable } from '@nestjs/common';

import { DatabaseException } from '../common/exceptions/resource.exception';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class RepliesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateReplyDto) {
    try {
      await this.prisma.reply.create({ data });
    } catch (error) {
      throw DatabaseException.create('Reply');
    }
  }
}
