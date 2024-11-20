import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateQuestionDto } from './dto/create-question.dto';

import { DatabaseException, ResourceNotFoundException } from '@common/exceptions/resource.exception';
import { PRISMA_ERROR_CODE } from '@prisma-alias/prisma.error';
import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(questionId: number) {
    try {
      return await this.prisma.question.findUnique({
        where: { questionId },
      });
    } catch (error) {
      throw DatabaseException.read('question');
    }
  }

  async findByIdAndSession(questionId: number, sessionId: string) {
    try {
      return await this.prisma.question.findUnique({
        where: {
          questionId,
          sessionId,
        },
      });
    } catch (error) {
      throw DatabaseException.read('question');
    }
  }

  async create({ sessionId, token: createUserToken, body }: CreateQuestionDto) {
    const questionData = {
      createUserToken,
      sessionId,
      body,
      pinned: false,
      closed: false,
    };
    try {
      return await this.prisma.question.create({
        data: questionData,
        include: {
          createUserTokenEntity: {
            select: {
              user: {
                select: { nickname: true },
              },
            },
          },
        },
      });
    } catch (error) {
      throw DatabaseException.create('question');
    }
  }

  async findQuestionsWithDetails(sessionId: string) {
    try {
      return await this.prisma.question.findMany({
        where: { sessionId },
        orderBy: { questionId: 'asc' },
        include: {
          questionLikes: {
            select: {
              createUserToken: true,
            },
          },
          createUserTokenEntity: {
            select: {
              user: {
                select: { nickname: true },
              },
            },
          },
          replies: {
            orderBy: { replyId: 'asc' },
            include: {
              createUserTokenEntity: {
                select: {
                  user: {
                    select: { nickname: true },
                  },
                },
              },
              replyLikes: {
                select: {
                  createUserToken: true,
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

  async updateBody(questionId: number, body: string) {
    try {
      return await this.prisma.question.update({
        where: { questionId },
        data: { body },
      });
    } catch (error) {
      throw DatabaseException.update('question');
    }
  }

  async deleteQuestion(questionId: number) {
    try {
      return await this.prisma.question.delete({
        where: { questionId },
      });
    } catch (error) {
      throw DatabaseException.delete('question');
    }
  }

  async updatePinned(questionId: number, pinned: boolean) {
    try {
      return await this.prisma.question.update({
        where: { questionId },
        data: { pinned },
      });
    } catch (error) {
      throw DatabaseException.update('question');
    }
  }

  async updateClosed(questionId: number, closed: boolean) {
    try {
      return await this.prisma.question.update({
        where: { questionId },
        data: { closed },
      });
    } catch (error) {
      throw DatabaseException.update('question');
    }
  }

  async findLike(questionId: number, createUserToken: string) {
    try {
      return await this.prisma.questionLike.findFirst({
        where: {
          questionId,
          createUserToken,
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
          questionId,
          createUserToken,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.FOREIGN_KEY_CONSTRAINT_VIOLATION
      ) {
        if (error.message.includes('questionId')) throw new ResourceNotFoundException('questionId');
        if (error.message.includes('createUserToken')) throw new ResourceNotFoundException('createUserToken');
      }
      throw DatabaseException.create('questionLike');
    }
  }

  async deleteLike(questionLikeId: number) {
    try {
      await this.prisma.questionLike.delete({
        where: { questionLikeId },
      });
    } catch (error) {
      throw DatabaseException.delete('questionLike');
    }
  }

  async getLikesCount(questionId: number) {
    try {
      return await this.prisma.questionLike.count({
        where: { questionId },
      });
    } catch (error) {
      throw DatabaseException.read('questionLike');
    }
  }
}
