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

import { BaseDto } from '@common/base.dto';
import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { requestSocket } from '@common/request-socket';
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
import { SOCKET_EVENTS } from '@socket/socket.constant';

@ApiTags('Questions')
@UseInterceptors(TransformInterceptor)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @GetQuestionSwagger()
  async getQuestionsBySession(@Query() getQuestionDto: GetQuestionDto) {
    const [questions, isHost, expired, sessionTitle] =
      await this.questionsService.getQuestionsBySession(getQuestionDto);
    return { questions, isHost, expired, sessionTitle };
  }

  @Post()
  @CreateQuestionSwagger()
  @ApiBody({ type: CreateQuestionDto })
  @UseGuards(SessionTokenValidationGuard)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    const createdQuestion = await this.questionsService.createQuestion(createQuestionDto);
    const { sessionId, token } = createQuestionDto;
    const resultForOwner = { question: createdQuestion };
    const resultForOther = { question: { ...createdQuestion, isOwner: false } };
    const event = SOCKET_EVENTS.QUESTION_CREATED;
    await requestSocket({ sessionId, token, event, content: resultForOther });
    return resultForOwner;
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
    const { sessionId, token } = updateQuestionBodyDto;
    const result = { question: updatedQuestion };
    const event = SOCKET_EVENTS.QUESTION_UPDATED;
    await requestSocket({ sessionId, token, event, content: result });
    return result;
  }

  @Delete(':questionId')
  @DeleteQuestionSwagger()
  @UseGuards(SessionTokenValidationGuard, QuestionExistenceGuard)
  async deleteQuestion(@Param('questionId', ParseIntPipe) questionId: number, @Query() data: BaseDto, @Req() req: any) {
    const { sessionId, token } = data;
    await this.questionsService.deleteQuestion(questionId, req.question, data);
    const resultForOther = { questionId };
    const event = SOCKET_EVENTS.QUESTION_DELETED;
    await requestSocket({ sessionId, token, event, content: resultForOther });
    return {};
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
    const { sessionId, token } = updateQuestionPinnedDto;
    const result = { question: updatedQuestion };
    const event = SOCKET_EVENTS.QUESTION_UPDATED;
    await requestSocket({ sessionId, token, event, content: result });
    return result;
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
    const { sessionId, token } = updateQuestionClosedDto;
    const result = { question: updatedQuestion };
    const event = SOCKET_EVENTS.QUESTION_UPDATED;
    await requestSocket({ sessionId, token, event, content: result });
    return result;
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
    const { sessionId, token } = toggleQuestionLikeDto;
    const resultForOwner = { liked, likesCount };
    const resultForOther = { questionId, liked: false, likesCount };
    const event = SOCKET_EVENTS.QUESTION_LIKED;
    await requestSocket({ sessionId, token, event, content: resultForOther });
    return resultForOwner;
  }
}
