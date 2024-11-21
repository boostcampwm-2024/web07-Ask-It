import { Injectable } from '@nestjs/common';

import { ChatSaveDto } from './chats.service';

import { DatabaseException } from '@common/exceptions/resource.exception';
import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class ChatsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save({ sessionId, token, body }: ChatSaveDto) {
    try {
      return await this.prisma.chatting.create({
        data: { sessionId, createUserToken: token, body },
        include: {
          createUserTokenEntity: {
            select: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      throw DatabaseException.create('chat');
    }
  }
}
