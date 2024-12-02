import { Injectable } from '@nestjs/common';

import { ChatsRepository } from './chats.repository';

export interface ChatSaveDto {
  sessionId: string;
  token: string;
  body: string;
}

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async saveChat(data: ChatSaveDto) {
    const chat = await this.chatsRepository.save(data);
    const { chattingId, createUserTokenEntity, body: content } = chat;
    return { chattingId, nickname: createUserTokenEntity?.user?.nickname || '익명', content };
  }

  async getChatsForInfiniteScroll(sessionId: string, count: number, chatId?: number) {
    const chats = await this.chatsRepository.getChatsForInfiniteScroll(sessionId, count, chatId);

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
  }
}
