import { ForbiddenException, Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';

import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionDto } from './dto/get-question.dto';
import { QuestionRepository } from './questions.repository';

import {
  UpdateQuestionBodyDto,
  UpdateQuestionClosedDto,
  UpdateQuestionPinnedDto,
} from '@questions/dto/update-question.dto';
import { SessionRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly sessionAuthRepository: SessionsAuthRepository,
  ) {}

  async createQuestion(data: CreateQuestionDto) {
    const newQuestion = await this.questionRepository.create(data);

    return {
      question_id: newQuestion.question_id,
      session_id: newQuestion.session_id,
      body: newQuestion.body,
      closed: newQuestion.closed,
      pinned: newQuestion.pinned,
      created_at: newQuestion.created_at,
      isOwner: true,
      likesCount: 0,
      hasLiked: false,
      nickname: newQuestion.createUserToken?.user?.nickname || '익명',
      replies: [],
    };
  }

  async getQuestionsBySession(data: GetQuestionDto) {
    const { sessionId, userToken } = data;
    const questions = await this.questionRepository.findQuestionsWithDetails(sessionId);

    const mapLikesAndOwnership = <
      T extends {
        create_user_token: string;
        likes: { create_user_token: string }[];
        createUserToken?: { user?: { nickname?: string } };
      },
    >(
      item: T,
      userToken: string,
    ) => {
      const isOwner = item.create_user_token === userToken;
      const likesCount = item.likes.length;
      const hasLiked = item.likes.some((like) => like.create_user_token === userToken);
      const nickname = item.createUserToken?.user?.nickname || '익명';

      return { isOwner, likesCount, hasLiked, nickname };
    };

    return questions.map((question) => {
      const {
        questionLikes,
        replies,
        question_id,
        create_user_token,
        body,
        closed,
        pinned,
        created_at,
        session_id,
        createUserToken,
      } = question;

      const questionInfo = {
        question_id,
        session_id,
        body,
        closed,
        pinned,
        created_at,
        ...mapLikesAndOwnership({ create_user_token, likes: questionLikes, createUserToken }, userToken),
      };

      const replyInfo = replies.map((reply) => {
        const { reply_id, create_user_token, body, created_at, createUserToken, replyLikes } = reply;

        return {
          reply_id,
          body,
          created_at,
          ...mapLikesAndOwnership({ create_user_token, likes: replyLikes, createUserToken }, userToken),
        };
      });

      return {
        ...questionInfo,
        replies: replyInfo,
      };
    });
  }

  async updateQuestionBody(question_id: number, updateQuestionBodyDto: UpdateQuestionBodyDto, question: Question) {
    const { body } = updateQuestionBodyDto;
    if (question.closed) {
      throw new ForbiddenException('이미 완료된 답변은 수정 할 수 없습니다.');
    }
    return await this.questionRepository.updateBody(question_id, body);
  }

  async deleteQuestion(question_id: number, question: Question) {
    if (question.closed) {
      throw new ForbiddenException('이미 완료된 답변은 삭제 할 수 없습니다.');
    }
    return await this.questionRepository.deleteQuestion(question_id);
  }

  async updateQuestionPinned(question_id: number, updateQuestionPinnedDto: UpdateQuestionPinnedDto) {
    const { session_id, create_user_token, pinned } = updateQuestionPinnedDto;
    const session = await this.sessionRepository.findById(session_id);
    const token = await this.sessionAuthRepository.findByToken(create_user_token);
    if (token.user_id !== session.create_user_id) {
      throw new ForbiddenException('세션 생성자만 이 작업을 수행할 수 있습니다.');
    }
    return await this.questionRepository.updatePinned(question_id, pinned);
  }

  async updateQuestionClosed(question_id: number, updateQuestionClosedDto: UpdateQuestionClosedDto) {
    const { session_id, create_user_token, closed } = updateQuestionClosedDto;
    if (!closed) {
      throw new ForbiddenException('이미 완료된 답변입니다.');
    }
    const session = await this.sessionRepository.findById(session_id);
    const token = await this.sessionAuthRepository.findByToken(create_user_token);
    if (token.user_id !== session.create_user_id) {
      throw new ForbiddenException('세션 생성자만 이 작업을 수행할 수 있습니다.');
    }
    return await this.questionRepository.updateClosed(question_id, closed);
  }

  async toggleLike(questionId: number, createUserToken: string) {
    const exist = await this.questionRepository.findLike(questionId, createUserToken);
    if (exist) await this.questionRepository.deleteLike(exist.question_like_id);
    else await this.questionRepository.createLike(questionId, createUserToken);
    return { liked: !exist };
  }

  async getLikesCount(questionId: number) {
    return this.questionRepository.getLikesCount(questionId);
  }
}
