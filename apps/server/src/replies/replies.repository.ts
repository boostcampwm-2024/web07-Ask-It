import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateReplyDto } from './dto/create-reply.dto';

import { DatabaseException, ResourceNotFoundException } from '@common/exceptions/resource.exception';
import { PRISMA_ERROR_CODE } from '@prisma-alias/prisma.error';
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
    try {
      return await this.prisma.reply.create({
        data: replyData,
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
      throw DatabaseException.create('Reply');
    }
  }

  async updateBody(replyId: number, body: string) {
    try {
      return await this.prisma.reply.update({
        where: { replyId },
        data: { body },
      });
    } catch (error) {
      throw DatabaseException.update('reply');
    }
  }

  async deleteReply(replyId: number) {
    try {
      return await this.prisma.reply.update({
        where: { replyId },
        data: { deleted: true },
      });
    } catch (error) {
      throw DatabaseException.delete('reply');
    }
  }

  async findReplyByQuestionId(questionId: number) {
    const replyExists = await this.prisma.reply.findFirst({
      where: { questionId },
    });
    return !!replyExists;
  }

  async findReplyByIdAndSessionId(replyId: number, sessionId: string) {
    try {
      return await this.prisma.reply.findFirst({
        where: { replyId, sessionId, deleted: false },
      });
    } catch (error) {
      throw DatabaseException.read('reply');
    }
  }

  async findLike(replyId: number, createUserToken: string) {
    try {
      return await this.prisma.replyLike.findFirst({
        where: {
          replyId,
          createUserToken,
        },
      });
    } catch (error) {
      throw DatabaseException.read('replyLike');
    }
  }

  async createLike(replyId: number, createUserToken: string) {
    try {
      await this.prisma.replyLike.create({
        data: {
          replyId,
          createUserToken,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.FOREIGN_KEY_CONSTRAINT_VIOLATION
      ) {
        if (error.message.includes('replyId')) throw new ResourceNotFoundException('replyId');
        if (error.message.includes('createUserToken')) throw new ResourceNotFoundException('createUserToken');
      }
      throw DatabaseException.create('replyLike');
    }
  }

  async deleteLike(replyLikeId: number) {
    try {
      await this.prisma.replyLike.delete({
        where: { replyLikeId },
      });
    } catch (error) {
      throw DatabaseException.delete('replyLike');
    }
  }

  async getLikesCount(replyId: number) {
    try {
      return await this.prisma.replyLike.count({
        where: { replyId },
      });
    } catch (error) {
      throw DatabaseException.read('replyLike');
    }
  }
}
