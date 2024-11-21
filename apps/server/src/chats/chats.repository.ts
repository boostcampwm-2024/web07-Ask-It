import { Injectable } from '@nestjs/common';

import { DatabaseException } from '@common/exceptions/resource.exception';
import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class ChatsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save({ sessionId, token, body }) {
    try {
      return await this.prisma.chatting.create({
        data: { sessionId, createUserToken: token, body },
      });
    } catch (error) {
      throw DatabaseException.create('chat');
    }
  }
}
