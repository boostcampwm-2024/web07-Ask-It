import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionRepository } from './sessions.repository';
@Injectable()
export class SessionsService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create(data: CreateSessionDto) {
    const sessionId = (await bcrypt.hash(new Date().toISOString(), 10)).slice(0, 21);
    const expiredAt = new Date(new Date().getTime() + 30 * 60 * 1000);

    await this.sessionRepository.create({
      ...data,
      session_id: sessionId,
      expired_at: expiredAt,
      create_user_id: 123,
    });
  }
}
