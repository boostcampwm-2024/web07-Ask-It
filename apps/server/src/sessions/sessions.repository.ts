import { DatabaseException } from '@common/exceptions/resource.exception';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-alias/prisma.service';

import { SessionCreateData } from './interface/session-create-data.interface';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: SessionCreateData) {
    try {
      return await this.prisma.session.create({ data });
    } catch (error) {
      throw DatabaseException.create('session');
    }
  }

  async findById(session_id: string) {
    try {
      return await this.prisma.session.findUnique({
        where: { session_id },
      });
    } catch (error) {
      throw DatabaseException.read('session');
    }
  }

  async getSessionsById(userId: number) {
    try {
      const userSessions = await this.prisma.userSessionToken.findMany({
        where: { user_id: userId },
        select: {
          session_id: true,
        },
      });
      const sessionIds = userSessions.map((session) => session.session_id);

      const sessions = await this.prisma.session.findMany({
        where: { session_id: { in: sessionIds } },
        select: {
          session_id: true,
          title: true,
          expired_at: true,
          created_at: true,
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
        where: { session_id: sessionId, create_user_id: userId },
      });
    } catch (error) {
      throw DatabaseException.read('session');
    }
  }
}
