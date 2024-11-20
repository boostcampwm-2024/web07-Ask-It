import { Module } from '@nestjs/common';

import { QuestionsController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import { QuestionsService } from './questions.service';

import { SessionTokenModule } from '@common/guards/session-token.module';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { QuestionExistenceGuard } from '@questions/guards/question-existence.guard';
import { QuestionOwnershipGuard } from '@questions/guards/question-ownership.guard';
import { RepliesRepository } from '@replies/replies.repository';
import { SocketModule } from '@socket/socket.module';

@Module({
  imports: [PrismaModule, SessionTokenModule, SocketModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRepository, QuestionExistenceGuard, QuestionOwnershipGuard, RepliesRepository],
  exports: [QuestionExistenceGuard, QuestionsRepository],
})
export class QuestionsModule {}
