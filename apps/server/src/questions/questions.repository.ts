import { Injectable } from '@nestjs/common';

import { CreateQuestionDto } from './dto/create-question.dto';

import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(questionId: number) {
    return await this.prisma.question.findUnique({
      where: { questionId },
    });
  }

  async findByIdAndSession(questionId: number, sessionId: string) {
    return await this.prisma.question.findUnique({
      where: {
        questionId,
        sessionId,
      },
    });
  }

  async create({ sessionId, token: createUserToken, body }: CreateQuestionDto) {
    const questionData = {
      createUserToken,
      sessionId,
      body,
      pinned: false,
      closed: false,
    };
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
  }

  async findQuestionsWithDetails(sessionId: string) {
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
            user: true,
          },
        },
        replies: {
          orderBy: { replyId: 'asc' },
          include: {
            createUserTokenEntity: {
              select: {
                user: true,
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
  }

  async updateBody(questionId: number, body: string) {
    return await this.prisma.question.update({
      where: { questionId },
      data: { body },
    });
  }

  async deleteQuestion(questionId: number) {
    return await this.prisma.question.delete({
      where: { questionId },
    });
  }

  async updatePinned(questionId: number, pinned: boolean) {
    return await this.prisma.question.update({
      where: { questionId },
      data: { pinned },
    });
  }

  async updateClosed(questionId: number, closed: boolean) {
    return await this.prisma.question.update({
      where: { questionId },
      data: { closed },
    });
  }

  async findLike(questionId: number, createUserToken: string) {
    return await this.prisma.questionLike.findFirst({
      where: {
        questionId,
        createUserToken,
      },
    });
  }

  async createLike(questionId: number, createUserToken: string) {
    await this.prisma.questionLike.create({
      data: {
        questionId,
        createUserToken,
      },
    });
  }

  async deleteLike(questionLikeId: number) {
    await this.prisma.questionLike.delete({
      where: { questionLikeId },
    });
  }

  async getLikesCount(questionId: number) {
    return await this.prisma.questionLike.count({
      where: { questionId },
    });
  }
}
