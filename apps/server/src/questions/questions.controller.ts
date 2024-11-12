import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionDto } from './dto/get-question.dto';
import { QuestionsService } from './questions.service';
import { CreateQuestionSwagger } from './swagger/create-question.swagger';
import { GetQuestionSwagger } from './swagger/get-question.swagger';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('Questions')
@UseInterceptors(TransformInterceptor)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @CreateQuestionSwagger()
  @ApiBody({ type: CreateQuestionDto })
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    await this.questionsService.createQuestion(createQuestionDto);
    return {};
  }

  @Get()
  @GetQuestionSwagger()
  async getQuestionsBySession(@Query() getQuestionDto: GetQuestionDto) {
    const questions = await this.questionsService.getQuestionsBySession(getQuestionDto);
    return { questions: questions };
  }
}
