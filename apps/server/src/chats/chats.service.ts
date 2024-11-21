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
}
