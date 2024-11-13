import { Injectable } from '@nestjs/common';

import { SessionAuthDto } from './dto/session-auth.dto';
import { SessionsAuthRepository } from './sessions-auth.repository';

@Injectable()
export class SessionsAuthService {
  constructor(private readonly sessionsAuthRepository: SessionsAuthRepository) {}

  async validateOrCreateToken(data: SessionAuthDto, user_id: number) {
    const { session_id, token } = data;

    if (!token) {
      const result = user_id ? await this.sessionsAuthRepository.findToken(user_id, session_id, token) : null;
      return result ?? (await this.sessionsAuthRepository.generateToken(data, user_id));
    } else {
      return await this.sessionsAuthRepository.generateTokenForLoggedin(data, user_id);
    }
  }
}
