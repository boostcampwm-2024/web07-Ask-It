import { Injectable } from '@nestjs/common';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionRepository } from './sessions.repository';

const SESSION_EXPIRATION_TIME = 30 * (60 * 1000);

@Injectable()
export class SessionsService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create(data: CreateSessionDto) {
    const expired_at = new Date(Date.now() + SESSION_EXPIRATION_TIME);

    const sessionData = {
      ...data,
      expired_at: expired_at,
      create_user_id: 123,
    };
    const createdSession = await this.sessionRepository.create(sessionData);
    return { sessionId: createdSession.session_id };
  }
}
