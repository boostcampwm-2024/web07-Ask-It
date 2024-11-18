import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionDto } from './dto/get-question.dto';
import { ToggleQuestionLikeDto } from './dto/toggle-question-like.dto';
import { QuestionsService } from './questions.service';
import { CreateQuestionSwagger } from './swagger/create-question.swagger';
import { GetQuestionSwagger } from './swagger/get-question.swagger';
import { ToggleQuestionLikeSwagger } from './swagger/toggle-question.swagger';

import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import {
  UpdateQuestionBodyDto,
  UpdateQuestionClosedDto,
  UpdateQuestionPinnedDto,
} from '@questions/dto/update-question.dto';
import { QuestionExistenceGuard } from '@questions/guards/question-existence.guard';
import { QuestionOwnershipGuard } from '@questions/guards/question-ownership.guard';
import { DeleteQuestionSwagger } from '@questions/swagger/delete-question.swagger';
import {
  UpdateQuestionBodySwagger,
  UpdateQuestionClosedSwagger,
  UpdateQuestionPinnedSwagger,
} from '@questions/swagger/update-question.swagger';

@ApiTags('Questions')
@UseInterceptors(TransformInterceptor)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @GetQuestionSwagger()
  async getQuestionsBySession(@Query() getQuestionDto: GetQuestionDto) {
    const [questions, isHost] = await this.questionsService.getQuestionsBySession(getQuestionDto);
    return { questions, isHost };
  }

  @Post()
  @CreateQuestionSwagger()
  @ApiBody({ type: CreateQuestionDto })
  @UseGuards(SessionTokenValidationGuard)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    const createdQuestion = await this.questionsService.createQuestion(createQuestionDto);
    return { question: createdQuestion };
  }

  @Patch(':questionId/body')
  @UpdateQuestionBodySwagger()
  @ApiBody({ type: UpdateQuestionBodyDto })
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard, QuestionOwnershipGuard)
  async updateQuestionBody(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() updateQuestionBodyDto: UpdateQuestionBodyDto,
    @Req() req: any,
  ) {
    const updatedQuestion = await this.questionsService.updateQuestionBody(
      questionId,
      updateQuestionBodyDto,
      req.question,
    );
    return { question: updatedQuestion };
  }

  @Delete(':questionId')
  @DeleteQuestionSwagger()
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard, QuestionOwnershipGuard)
  async deleteQuestion(@Param('questionId', ParseIntPipe) questionId: number, @Req() req: any) {
    const deletedQuestion = await this.questionsService.deleteQuestion(questionId, req.question);
    return { question: deletedQuestion };
  }

  @Patch(':questionId/pinned')
  @UpdateQuestionPinnedSwagger()
  @ApiBody({ type: UpdateQuestionPinnedDto })
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard)
  async updateQuestionPinned(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() updateQuestionPinnedDto: UpdateQuestionPinnedDto,
  ) {
    const updatedQuestion = await this.questionsService.updateQuestionPinned(questionId, updateQuestionPinnedDto);
    return { question: updatedQuestion };
  }

  @Patch(':questionId/closed')
  @UpdateQuestionClosedSwagger()
  @ApiBody({ type: UpdateQuestionClosedDto })
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard)
  async updateQuestionClosed(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() updateQuestionClosedDto: UpdateQuestionClosedDto,
  ) {
    const updatedQuestion = await this.questionsService.updateQuestionClosed(questionId, updateQuestionClosedDto);
    return { question: updatedQuestion };
  }

  @Post(':questionId/likes')
  @ToggleQuestionLikeSwagger()
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard)
  async toggleLike(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() toggleQuestionLikeDto: ToggleQuestionLikeDto,
  ) {
    const { liked } = await this.questionsService.toggleLike(questionId, toggleQuestionLikeDto.token);
    const likesCount = await this.questionsService.getLikesCount(questionId);
    return { liked, likesCount };
  }
}
