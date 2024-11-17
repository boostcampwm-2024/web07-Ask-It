import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseException, ResourceNotFoundException } from '../common/exceptions/resource.exception';
import { PRISMA_ERROR_CODE } from '../prisma/prisma.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { DeleteReplyDto } from './dto/delete-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class RepliesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createReply(data: CreateReplyDto) {
    try {
      return (await this.prisma.reply.create({ data })).reply_id;
    } catch (error) {
      throw DatabaseException.create('Reply');
    }
  }

  async updateReply(data: UpdateReplyDto) {
    try {
      return await this.prisma.reply.updateMany({
        where: {
          session_id: data.session_id,
          question_id: data.question_id,
          reply_id: data.reply_id,
        },
        data: {
          body: data.body,
        },
      });
    } catch (error) {
      throw DatabaseException.update('reply');
    }
  }

  async deleteReply(data: DeleteReplyDto) {
    try {
      return await this.prisma.reply.deleteMany({
        where: {
          session_id: data.session_id,
          question_id: data.question_id,
          reply_id: data.reply_id,
        },
      });
    } catch (error) {
      throw DatabaseException.delete('reply');
    }
  }

  async findReplyByQuestionIdAndSession(reply_id: number, question_id: number, session_id: string) {
    try {
      return await this.prisma.reply.findFirst({
        where: { reply_id: reply_id, question_id: question_id, session_id: session_id },
      });
    } catch (error) {
      throw DatabaseException.read('reply');
    }
  }

  async findLike(replyId: number, createUserToken: string) {
    try {
      return await this.prisma.replyLike.findFirst({
        where: {
          reply_id: replyId,
          create_user_token: createUserToken,
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
          reply_id: replyId,
          create_user_token: createUserToken,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.FOREIGN_KEY_CONSTRAINT_VIOLATION
      ) {
        if (error.message.includes('reply_id')) throw new ResourceNotFoundException('reply_id');
        if (error.message.includes('create_user_token')) throw new ResourceNotFoundException('create_user_token');
      }
      throw DatabaseException.create('replyLike');
    }
  }

  async deleteLike(replyLikeId: number) {
    try {
      await this.prisma.replyLike.delete({
        where: { reply_like_id: replyLikeId },
      });
    } catch (error) {
      throw DatabaseException.delete('replyLike');
    }
  }

  async getLikesCount(replyId: number) {
    try {
      return await this.prisma.replyLike.count({
        where: { reply_id: replyId },
      });
    } catch (error) {
      throw DatabaseException.read('replyLike');
    }
  }
}
