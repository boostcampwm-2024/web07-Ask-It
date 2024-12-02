import { Injectable } from '@nestjs/common';

import { CreateReplyDto } from './dto/create-reply.dto';

import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class RepliesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReply({ questionId, token: createUserToken, sessionId, body }: CreateReplyDto) {
    const replyData = {
      questionId,
      createUserToken,
      sessionId,
      body,
    };
    return await this.prisma.reply.create({
      data: replyData,
      include: {
        createUserTokenEntity: {
          select: {
            user: true,
          },
        },
      },
    });
  }

  async updateBody(replyId: number, body: string) {
    return await this.prisma.reply.update({
      where: { replyId },
      data: { body },
    });
  }

  async deleteReply(replyId: number) {
    return await this.prisma.reply.update({
      where: { replyId },
      data: { deleted: true },
    });
  }

  async findReplyByQuestionId(questionId: number) {
    const replyExists = await this.prisma.reply.findFirst({
      where: { questionId },
    });
    return !!replyExists;
  }

  async findReplyByIdAndSessionId(replyId: number, sessionId: string) {
    return await this.prisma.reply.findFirst({
      where: { replyId, sessionId, deleted: false },
    });
  }

  async findLike(replyId: number, createUserToken: string) {
    return await this.prisma.replyLike.findFirst({
      where: {
        replyId,
        createUserToken,
      },
    });
  }

  async createLike(replyId: number, createUserToken: string) {
    return await this.prisma.replyLike.create({
      data: {
        replyId,
        createUserToken,
      },
      include: {
        reply: true,
      },
    });
  }

  async deleteLike(replyLikeId: number) {
    return await this.prisma.replyLike.delete({
      where: { replyLikeId },
      include: {
        reply: true,
      },
    });
  }

  async getLikesCount(replyId: number) {
    return await this.prisma.replyLike.count({
      where: { replyId },
    });
  }
}
