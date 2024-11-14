import { Module } from '@nestjs/common';

import { QuestionsController } from './questions.controller';
import { QuestionRepository } from './questions.repository';
import { QuestionsService } from './questions.service';

import { SessionTokenModule } from '@common/pipes/session-token.module';
import { PrismaModule } from '@prisma-alias/prisma.module';

@Module({
  imports: [PrismaModule, SessionTokenModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository],
})
export class QuestionsModule {}
