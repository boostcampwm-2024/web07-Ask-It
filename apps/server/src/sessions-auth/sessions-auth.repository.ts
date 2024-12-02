import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class SessionsAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(userId: number | null, sessionId: string, isHost = false) {
    const newUserSessionToken = await this.prisma.userSessionToken.create({
      data: {
        sessionId,
        userId: userId ? userId : null,
        token: uuid4(),
        isHost,
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

  async findHostTokensInSession(sessionId: string) {
    return await this.prisma.userSessionToken.findMany({ where: { sessionId, isHost: true } });
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
    return await this.prisma.userSessionToken.findFirst({
      where: {
        token,
      },
    });
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
    return await this.prisma.reply.findUnique({
      where: { replyId, sessionId },
    });
  }

  async findUsersBySessionId(sessionId: string) {
    return await this.prisma.userSessionToken.findMany({
      where: {
        sessionId,
        userId: {
          not: null,
        },
      },
      include: {
        user: {
          select: {
            userId: true,
            nickname: true,
          },
        },
      },
    });
  }

  async updateIsHost(token: string, isHost: boolean) {
    return await this.prisma.userSessionToken.update({
      where: {
        token,
      },
      data: { isHost },
      select: { user: true, isHost: true },
    });
  }
}
