import { Module } from '@nestjs/common';

import { QuestionsController } from './questions.controller';
import { QuestionRepository } from './questions.repository';
import { QuestionsService } from './questions.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository],
})
export class QuestionsModule {}
