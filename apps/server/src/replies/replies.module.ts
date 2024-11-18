import { SessionTokenModule } from '@common/guards/session-token.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { SessionsModule } from '@sessions/sessions.module';
import { QuestionsModule } from '@src/questions/questions.module';

import { RepliesController } from './replies.controller';
import { RepliesRepository } from './replies.repository';
import { RepliesService } from './replies.service';

@Module({
  imports: [PrismaModule, SessionTokenModule, SessionsModule, QuestionsModule],
  controllers: [RepliesController],
  providers: [RepliesService, RepliesRepository],
})
export class RepliesModule {}
