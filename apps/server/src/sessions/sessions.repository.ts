import { Injectable } from '@nestjs/common';

import { SessionCreateData } from './interface/session-create-data.interface';

import { DatabaseException } from '@common/exceptions/resource.exception';
import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class SessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: SessionCreateData) {
    try {
      return await this.prisma.session.create({ data });
    } catch (error) {
      throw DatabaseException.create('session');
    }
  }

  async findById(sessionId: string) {
    try {
      return await this.prisma.session.findUnique({
        where: { sessionId },
      });
    } catch (error) {
      throw DatabaseException.read('session');
    }
  }

  async getSessionsById(userId: number) {
    try {
      const userSessions = await this.prisma.userSessionToken.findMany({
        where: { userId },
        select: {
          sessionId: true,
        },
      });
      const sessionIds = userSessions.map((session) => session.sessionId);

      const sessions = await this.prisma.session.findMany({
        where: { sessionId: { in: sessionIds } },
        select: {
          sessionId: true,
          title: true,
          expiredAt: true,
          createdAt: true,
        },
      });
      return sessions;
    } catch (error) {
      throw DatabaseException.read('UserSessionToken');
    }
  }

  async findBySessionIdAndUser(sessionId: string, userId: number) {
    try {
      return await this.prisma.session.findFirst({
        where: { sessionId, createUserId: userId },
      });
    } catch (error) {
      throw DatabaseException.read('session');
    }
  }
}
