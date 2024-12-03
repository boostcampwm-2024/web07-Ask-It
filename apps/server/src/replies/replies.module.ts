import { Module } from '@nestjs/common';

import { RepliesController } from './replies.controller';
import { RepliesRepository } from './replies.repository';
import { RepliesService } from './replies.service';

import { SessionTokenModule } from '@common/guards/session-token.module';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { QuestionsModule } from '@questions/questions.module';
import { SessionsRepository } from '@sessions/sessions.repository';

@Module({
  imports: [PrismaModule, SessionTokenModule, QuestionsModule],
  controllers: [RepliesController],
  providers: [RepliesService, RepliesRepository, SessionsRepository],
})
export class RepliesModule {}
