import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChatsService } from './chats.service';
import { GetChatsSwagger } from './swagger/get-chats.swagger';

import { BaseDto } from '@common/base.dto';

@Controller('chats')
@ApiTags('Chats')
export class ChatsController {
  private readonly CHAT_FETCH_LIMIT = 20;

  constructor(private readonly chatsService: ChatsService) {}

  @Get(':chatId?')
  @GetChatsSwagger()
  async getChats(@Query() data: BaseDto, @Param('chatId', new ParseIntPipe({ optional: true })) chatId?: number) {
    const chats = await this.chatsService.getChatsForInfiniteScroll(data.sessionId, this.CHAT_FETCH_LIMIT, chatId);
    return { chats };
  }
}
