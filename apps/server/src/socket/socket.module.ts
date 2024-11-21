import { Module } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';

import { ChatsRepository } from '@src/chats/chats.repository';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SocketGateway, ChatsRepository],
  exports: [SocketGateway],
})
export class SocketModule {}
