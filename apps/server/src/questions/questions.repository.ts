import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseException, ResourceNotFoundException } from '../common/exceptions/resource.exception';
import { PRISMA_ERROR_CODE } from '../prisma/prisma.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuestionDto) {
    const questionData = {
      ...data,
      pinned: false,
      closed: false,
    };
    try {
      await this.prisma.question.create({ data: questionData });
    } catch (error) {
      throw DatabaseException.create('question');
    }
  }

  async findQuestionsWithDetails(sessionId: string) {
    try {
      return await this.prisma.question.findMany({
        where: { session_id: sessionId },
        include: {
          questionLikes: {
            select: {
              create_user_token: true,
            },
          },
          createUserToken: {
            select: {
              user: {
                select: { nickname: true },
              },
            },
          },
          replies: {
            include: {
              createUserToken: {
                select: {
                  user: {
                    select: { nickname: true },
                  },
                },
              },
              replyLikes: {
                select: {
                  create_user_token: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw DatabaseException.read('question');
    }
  }

  async findLike(questionId: number, createUserToken: string) {
    try {
      return await this.prisma.questionLike.findFirst({
        where: {
          question_id: questionId,
          create_user_token: createUserToken,
        },
      });
    } catch (error) {
      throw DatabaseException.read('questionLike');
    }
  }

  async createLike(questionId: number, createUserToken: string) {
    try {
      await this.prisma.questionLike.create({
        data: {
          question_id: questionId,
          create_user_token: createUserToken,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === PRISMA_ERROR_CODE.FOREIGN_KEY_CONSTRAINT_VIOLATION) {
        if (error.message.includes('question_id')) throw new ResourceNotFoundException('question_id');
        if (error.message.includes('create_user_token')) throw new ResourceNotFoundException('create_user_token');
      }
      throw DatabaseException.create('questionLike');
    }
  }

  async deleteLike(questionLikeId: number) {
    try {
      await this.prisma.questionLike.delete({
        where: { question_like_id: questionLikeId },
      });
    } catch (error) {
      throw DatabaseException.delete('questionLike');
    }
  }

  async getLikesCount(questionId: number) {
    try {
      return await this.prisma.questionLike.count({
        where: { question_id: questionId },
      });
    } catch (error) {
      throw DatabaseException.read('questionLike');
    }
  }
}
