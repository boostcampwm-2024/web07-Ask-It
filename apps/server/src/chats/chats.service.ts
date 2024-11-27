import { Injectable } from '@nestjs/common';

import { ChatsRepository } from './chats.repository';

import { DatabaseException } from '@common/exceptions/resource.exception';
import { PrismaService } from '@prisma-alias/prisma.service';

export interface ChatSaveDto {
  sessionId: string;
  token: string;
  body: string;
}

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async saveChat(data: ChatSaveDto) {
    const chat = await this.chatsRepository.save(data);
    const { chattingId, createUserTokenEntity, body: content } = chat;
    return { chattingId, nickname: createUserTokenEntity?.user?.nickname || '익명', content };
  }

  async getChatsForInfiniteScroll(sessionId: string, count: number, chatId?: number) {
    try {
      const chats = await this.prisma.chatting.findMany({
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
      return chats.map((x) => {
        const { createUserTokenEntity, chattingId, body: content } = x;
        const { user } = createUserTokenEntity;
        const nickname = user?.nickname || '익명';
        return {
          chattingId,
          nickname,
          content,
        };
      });
    } catch (error) {
      throw DatabaseException.read('chatting');
    }
  }
}
