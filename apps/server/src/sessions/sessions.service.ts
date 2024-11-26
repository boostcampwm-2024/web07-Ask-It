import { Injectable } from '@nestjs/common';

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
}
