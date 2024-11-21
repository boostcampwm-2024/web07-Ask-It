import { Module } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';
import { ChatsModule } from '../chats/chats.module';

import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { SessionTokenModule } from '@common/guards/session-token.module';
import { PrismaModule } from '@prisma-alias/prisma.module';

@Module({
  imports: [PrismaModule, ChatsModule, SessionTokenModule],
  providers: [SocketGateway, SessionTokenValidationGuard],
  exports: [SocketGateway],
})
export class SocketModule {}
