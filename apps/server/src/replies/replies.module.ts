import { Module } from '@nestjs/common';
import { SocketModule } from '@socket/socket.module';

import { RepliesController } from './replies.controller';
import { RepliesRepository } from './replies.repository';
import { RepliesService } from './replies.service';

import { SessionTokenModule } from '@common/guards/session-token.module';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { QuestionsModule } from '@questions/questions.module';
import { SessionsModule } from '@sessions/sessions.module';

@Module({
  imports: [PrismaModule, SessionTokenModule, SessionsModule, QuestionsModule, SocketModule],
  controllers: [RepliesController],
  providers: [RepliesService, RepliesRepository],
})
export class RepliesModule {}
