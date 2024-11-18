import { Injectable } from '@nestjs/common';

import { SessionAuthDto } from './dto/session-auth.dto';
import { SessionsAuthRepository } from './sessions-auth.repository';

@Injectable()
export class SessionsAuthService {
  constructor(private readonly sessionsAuthRepository: SessionsAuthRepository) {}

  async validateOrCreateToken(data: SessionAuthDto, userId: number | null) {
    const { sessionId, token } = data;
    if (!token) {
      const result =
        userId === null
          ? await this.sessionsAuthRepository.generateToken(userId, sessionId)
          : await this.sessionsAuthRepository.findTokenByUserId(userId, sessionId);
      return result ?? (await this.sessionsAuthRepository.generateToken(userId, sessionId));
    } else {
      const result =
        userId === null
          ? await this.sessionsAuthRepository.findTokenByToken(sessionId, token)
          : await this.sessionsAuthRepository.findTokenByUserIdAndToken(userId, sessionId, token);
      return result ?? (await this.sessionsAuthRepository.generateToken(userId, sessionId));
    }
  }
}
