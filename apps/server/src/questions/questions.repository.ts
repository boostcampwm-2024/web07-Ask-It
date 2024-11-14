import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PRISMA_ERROR_CODE } from '../prisma/prisma.error';
import { CreateQuestionDto } from './dto/create-question.dto';

import { DatabaseException, ResourceNotFoundException } from '@common/exceptions/resource.exception';
import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(question_id: number) {
    try {
      return await this.prisma.question.findUnique({
        where: { question_id: question_id },
      });
    } catch (error) {
      throw DatabaseException.read('question');
    }
  }

  async findByIdAndSession(question_id: number, session_id: string) {
    try {
      return await this.prisma.question.findUnique({
        where: { question_id: question_id, session_id: session_id },
      });
    } catch (error) {
      throw DatabaseException.read('question');
    }
  }

  async create(data: CreateQuestionDto) {
    const questionData = {
      ...data,
      pinned: false,
      closed: false,
    };
    try {
      return await this.prisma.question.create({
        data: questionData,
        include: {
          createUserToken: {
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

  async updateBody(question_id: number, body: string) {
    try {
      return await this.prisma.question.update({
        where: { question_id },
        data: { body },
      });
    } catch (error) {
      throw DatabaseException.update('question');
    }
  }

  async deleteQuestion(question_id: number) {
    try {
      return await this.prisma.question.delete({
        where: { question_id: question_id },
      });
    } catch (error) {
      throw DatabaseException.delete('question');
    }
  }

  async updatePinned(question_id: number, pinned: boolean) {
    try {
      return await this.prisma.question.update({
        where: { question_id },
        data: { pinned },
      });
    } catch (error) {
      throw DatabaseException.update('question');
    }
  }

  async updateClosed(question_id: number, closed: boolean) {
    try {
      return await this.prisma.question.update({
        where: { question_id },
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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.FOREIGN_KEY_CONSTRAINT_VIOLATION
      ) {
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
