import { Module } from '@nestjs/common';
import { SessionTokenModule } from '@src/common/guards/session-token.module';
import { QuestionsModule } from '@src/questions/questions.module';

import { RepliesController } from './replies.controller';
import { RepliesRepository } from './replies.repository';
import { RepliesService } from './replies.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, SessionTokenModule, QuestionsModule],
  controllers: [RepliesController],
  providers: [RepliesService, RepliesRepository],
})
export class RepliesModule {}
