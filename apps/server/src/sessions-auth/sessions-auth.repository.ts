import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

import { DatabaseException } from '@common/exceptions/resource.exception';
import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class SessionsAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(userId: number | null, sessionId: string) {
    const newUserSessionToken = await this.prisma.userSessionToken.create({
      data: {
        sessionId,
        userId: userId ? userId : null,
        token: uuid4(),
      },
    });
    return newUserSessionToken.token;
  }

  async findTokenByUserId(userId: number, sessionId: string) {
    const record = await this.prisma.userSessionToken.findFirst({
      where: {
        userId,
        sessionId,
      },
      select: {
        token: true,
      },
    });
    return record?.token || null;
  }
  async findTokenByToken(sessionId: string, token: string) {
    const record = await this.prisma.userSessionToken.findFirst({
      where: {
        token,
        sessionId,
        userId: null,
      },
      select: {
        token: true,
      },
    });
    return record?.token || null;
  }

  async findByToken(token: string) {
    try {
      return await this.prisma.userSessionToken.findFirst({
        where: {
          token,
        },
      });
    } catch (error) {
      throw DatabaseException.read('sessions-auth');
    }
  }

  async findUserByToken(token: string) {
    try {
      const record = await this.prisma.userSessionToken.findFirst({
        where: {
          token,
        },
        select: {
          userId: true,
        },
      });
      return record?.userId || null;
    } catch (error) {
      throw DatabaseException.read('sessions-auth');
    }
  }

  async findTokenByUserIdAndToken(userId: number, sessionId: string, token: string) {
    const record = await this.prisma.userSessionToken.findFirst({
      where: {
        token,
        sessionId,
        userId,
      },
      select: {
        token: true,
      },
    });
    if (record === null) return await this.findTokenByUserId(userId, sessionId);
    return record?.token || null;
  }
  async findByIdAndSession(replyId: number, sessionId: string) {
    try {
      return await this.prisma.reply.findUnique({
        where: { replyId, sessionId },
      });
    } catch (error) {
      throw DatabaseException.read('reply');
    }
  }
}
