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
  async getChatsForInfiniteScroll(sessionId: string, count: number, chatId?: number) {
    try {
      return await this.prisma.chatting.findMany({
        where: {
          sessionId,
          ...(chatId && { chattingId: { lt: chatId } }),
        },
        include: {
          createUserTokenEntity: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          chattingId: 'desc',
        },
        take: count,
      });
    } catch (error) {
      throw new Error('Error retrieving chats from database');
    }
  }
}
