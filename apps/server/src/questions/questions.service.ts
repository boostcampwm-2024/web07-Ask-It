import { Injectable } from '@nestjs/common';

import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionDto } from './dto/get-question.dto';
import { QuestionRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsRepository: QuestionRepository) {}

  async createQuestion(data: CreateQuestionDto) {
    return await this.questionsRepository.create(data);
  }
  async getQuestionsBySession(data: GetQuestionDto) {
    const { sessionId, userToken } = data;
    const questions = await this.questionsRepository.findQuestionsWithDetails(sessionId);

    const mapLikesAndOwnership = <
      T extends { create_user_token: string; likes: { create_user_token: string }[]; createUserToken?: { user?: { nickname?: string } } },
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
      const { questionLikes, replies, question_id, create_user_token, body, closed, pinned, created_at, session_id, createUserToken } = question;

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
}
