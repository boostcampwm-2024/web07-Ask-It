import { Module } from '@nestjs/common';

import { ChatsRepository } from './chats.repository';
import { ChatsService } from './chats.service';

import { PrismaModule } from '@prisma-alias/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChatsRepository, ChatsService],
  exports: [ChatsService, ChatsRepository],
})
export class ChatsModule {}
