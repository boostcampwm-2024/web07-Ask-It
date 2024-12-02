import { Injectable } from '@nestjs/common';

import { SessionCreateData } from './interface/session-create-data.interface';

import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class SessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: SessionCreateData) {
    return await this.prisma.session.create({ data });
  }

  async findById(sessionId: string) {
    return await this.prisma.session.findUnique({
      where: { sessionId },
    });
  }

  async getSessionsById(userId: number) {
    const userSessions = await this.prisma.userSessionToken.findMany({
      where: { userId },
      select: {
        sessionId: true,
      },
    });
    const sessionIds = userSessions.map((session) => session.sessionId);
    return await this.prisma.session.findMany({
      where: { sessionId: { in: sessionIds } },
      select: {
        sessionId: true,
        title: true,
        expiredAt: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateSessionExpiredAt(sessionId: string, expireTime: Date) {
    await this.prisma.session.update({
      where: {
        sessionId,
      },
      data: { expiredAt: expireTime },
    });
  }
}
