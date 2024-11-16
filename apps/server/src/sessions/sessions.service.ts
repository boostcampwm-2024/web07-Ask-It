import { Injectable } from '@nestjs/common';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionCreateData } from './interface/session-create-data.interface';
import { SessionRepository } from './sessions.repository';

const SESSION_EXPIRATION_TIME = 7 * (24 * 60 * 60 * 1000); //일주일

@Injectable()
export class SessionsService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create(data: CreateSessionDto, userId: number) {
    const expired_at = new Date(Date.now() + SESSION_EXPIRATION_TIME);

    const sessionCreateData: SessionCreateData = {
      ...data,
      expired_at: expired_at,
      user: {
        connect: { user_id: userId },
      },
    };

    const createdSession = await this.sessionRepository.create(sessionCreateData);
    return { sessionId: createdSession.session_id };
  }
}
