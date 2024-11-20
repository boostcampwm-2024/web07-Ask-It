import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
