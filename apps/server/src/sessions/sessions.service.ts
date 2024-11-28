import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionCreateData } from './interface/session-create-data.interface';
import { SessionsRepository } from './sessions.repository';

import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

const SESSION_EXPIRATION_TIME = 7 * (24 * 60 * 60 * 1000); //일주일

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionRepository: SessionsRepository,
    private readonly sessionsAuthRepository: SessionsAuthRepository,
  ) {}

  async create(data: CreateSessionDto, userId: number) {
    const expiredAt = new Date(Date.now() + SESSION_EXPIRATION_TIME);

    const sessionCreateData: SessionCreateData = {
      ...data,
      expiredAt,
      user: {
        connect: { userId },
      },
    };

    const createdSession = await this.sessionRepository.create(sessionCreateData);
    const { sessionId } = createdSession;
    await this.sessionsAuthRepository.generateToken(userId, sessionId, true);
    return { sessionId };
  }

  async getSessionsById(userId: number) {
    const sessionData = await this.sessionRepository.getSessionsById(userId);

    const transformedSessions = sessionData.map((session) => {
      const createdDate = new Date(session.createdAt);
      const formattedCreatedAt = {
        year: createdDate.getFullYear(),
        month: createdDate.getMonth() + 1,
        date: createdDate.getDate(),
      };

      return {
        sessionId: session.sessionId,
        title: session.title,
        createdAt: formattedCreatedAt,
        expired: session.expiredAt < new Date(),
      };
    });
    return transformedSessions;
  }

  async terminateSession(sessionId: string, token: string) {
    const [{ createUserId }, { userId }] = await Promise.all([
      this.sessionRepository.findById(sessionId),
      this.sessionsAuthRepository.findByToken(token),
    ]);

    if (createUserId !== userId) {
      throw new ForbiddenException('세션 생성자만이 이 작업을 수행할 수 있습니다.');
    }
    const expireTime = new Date();
    await this.sessionRepository.updateSessionExpiredAt(sessionId, expireTime);
    return { expired: true };
  }
}
