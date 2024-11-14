import { Injectable } from '@nestjs/common';

import { SessionAuthDto } from './dto/session-auth.dto';
import { SessionsAuthRepository } from './sessions-auth.repository';

@Injectable()
export class SessionsAuthService {
  constructor(private readonly sessionsAuthRepository: SessionsAuthRepository) {}

  async validateOrCreateToken(data: SessionAuthDto, user_id: number | null) {
    const { session_id, token } = data;
    if (!token) {
      const result =
        user_id === null
          ? await this.sessionsAuthRepository.generateToken(user_id, session_id)
          : await this.sessionsAuthRepository.findTokenByUserId(user_id, session_id);
      return result ?? (await this.sessionsAuthRepository.generateToken(user_id, session_id));
    } else {
      const result =
        user_id === null
          ? await this.sessionsAuthRepository.findTokenByToken(session_id, token)
          : await this.sessionsAuthRepository.findTokenByUserIdAndToken(user_id, session_id, token);
      return result ?? (await this.sessionsAuthRepository.generateToken(user_id, session_id));
    }
  }
}
