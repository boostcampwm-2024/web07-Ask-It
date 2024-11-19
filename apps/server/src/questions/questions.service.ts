import { ForbiddenException, Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';

import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionDto } from './dto/get-question.dto';
import { QuestionsRepository } from './questions.repository';

import {
  UpdateQuestionBodyDto,
  UpdateQuestionClosedDto,
  UpdateQuestionPinnedDto,
} from '@questions/dto/update-question.dto';
import { RepliesRepository } from '@replies/replies.repository';
import { SessionRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionsRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly sessionAuthRepository: SessionsAuthRepository,
    private readonly repliesRepository: RepliesRepository,
  ) {}

  async createQuestion(data: CreateQuestionDto) {
    const newQuestion = await this.questionRepository.create(data);
    const { createUserTokenEntity, ...questionWithoutTokenEntity } = newQuestion;
    const nickname = createUserTokenEntity?.user?.nickname || '익명';
    return {
      ...questionWithoutTokenEntity,
      isOwner: true,
      likesCount: 0,
      liked: false,
      nickname,
      replies: [],
    };
  }

  async getQuestionsBySession(data: GetQuestionDto) {
    const { sessionId, token } = data;
    const questions = await this.questionRepository.findQuestionsWithDetails(sessionId);
    const session = await this.sessionRepository.findById(sessionId);
    const expired = session.expiredAt < new Date();
    const sessionHostToken = await this.sessionAuthRepository.findTokenByUserId(session.createUserId, sessionId);
    const isHost = sessionHostToken === token;

    const mapLikesAndOwnership = <
      T extends {
        createUserToken: string;
        likes: { createUserToken: string }[];
        createUserTokenEntity?: { user?: { nickname?: string } };
      },
    >(
      item: T,
      token: string,
    ) => {
      const isOwner = item.createUserToken === token;
      const isHost = item.createUserToken === sessionHostToken;
      const likesCount = item.likes.length;
      const liked = item.likes.some((like) => like.createUserToken === token);
      const nickname = item.createUserTokenEntity?.user?.nickname || '익명';

      return { isOwner, likesCount, liked, nickname, isHost };
    };

    return [
      questions.map((question) => {
        const {
          questionLikes,
          replies,
          questionId,
          createUserToken,
          body,
          closed,
          pinned,
          createdAt,
          sessionId,
          createUserTokenEntity,
        } = question;

        const questionInfo = {
          questionId,
          sessionId,
          body,
          closed,
          pinned,
          createdAt,
          ...mapLikesAndOwnership({ createUserToken, likes: questionLikes, createUserTokenEntity }, token),
        };

        const replyInfo = replies.map((reply) => {
          const { replyId, createUserToken, body, createdAt, createUserTokenEntity, replyLikes, deleted } = reply;

          return {
            replyId,
            body,
            createdAt,
            deleted,
            ...mapLikesAndOwnership({ createUserToken, likes: replyLikes, createUserTokenEntity }, token),
          };
        });

        return {
          ...questionInfo,
          replies: replyInfo,
        };
      }),
      isHost,
      expired,
    ];
  }

  async updateQuestionBody(questionId: number, updateQuestionBodyDto: UpdateQuestionBodyDto, question: Question) {
    const { body } = updateQuestionBodyDto;
    const isReplied = await this.repliesRepository.findReplyByQuestionId(questionId);
    if (isReplied) {
      throw new ForbiddenException('답변이 달린 질문은 수정할 수 없습니다.');
    }
    if (question.closed) {
      throw new ForbiddenException('이미 완료된 답변은 수정할 수 없습니다.');
    }
    return await this.questionRepository.updateBody(questionId, body);
  }

  async deleteQuestion(questionId: number, question: Question) {
    const isReplied = await this.repliesRepository.findReplyByQuestionId(questionId);
    if (isReplied) {
      throw new ForbiddenException('답변이 달린 질문은 삭제할 수 없습니다.');
    }
    if (question.closed) {
      throw new ForbiddenException('이미 완료된 답변은 삭제할 수 없습니다.');
    }
    return await this.questionRepository.deleteQuestion(questionId);
  }

  async updateQuestionPinned(questionId: number, updateQuestionPinnedDto: UpdateQuestionPinnedDto) {
    const { sessionId, token, pinned } = updateQuestionPinnedDto;
    const session = await this.sessionRepository.findById(sessionId);
    const foundToken = await this.sessionAuthRepository.findByToken(token);
    if (foundToken.userId !== session.createUserId) {
      throw new ForbiddenException('세션 생성자만 이 작업을 수행할 수 있습니다.');
    }
    return await this.questionRepository.updatePinned(questionId, pinned);
  }

  async updateQuestionClosed(questionId: number, updateQuestionClosedDto: UpdateQuestionClosedDto) {
    const { sessionId, token, closed } = updateQuestionClosedDto;
    if (!closed) {
      throw new ForbiddenException('이미 완료된 답변입니다.');
    }
    const session = await this.sessionRepository.findById(sessionId);
    const foundToken = await this.sessionAuthRepository.findByToken(token);
    if (foundToken.userId !== session.createUserId) {
      throw new ForbiddenException('세션 생성자만 이 작업을 수행할 수 있습니다.');
    }
    return await this.questionRepository.updateClosed(questionId, closed);
  }

  async toggleLike(questionId: number, createUserToken: string) {
    const exist = await this.questionRepository.findLike(questionId, createUserToken);
    if (exist) await this.questionRepository.deleteLike(exist.questionLikeId);
    else await this.questionRepository.createLike(questionId, createUserToken);
    return { liked: !exist };
  }

  async getLikesCount(questionId: number) {
    return this.questionRepository.getLikesCount(questionId);
  }
}
