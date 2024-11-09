import { Injectable } from '@nestjs/common';

import { SessionAuthDto } from './dto/session-auth.dto';
import { SessionsAuthRepository } from './sessions-auth.repository';

@Injectable()
export class SessionsAuthService {
  constructor(private readonly sessionsAuthRepository: SessionsAuthRepository) {}

  async validateOrCreateToken(data: SessionAuthDto) {
    const { session_id, user_id, token } = data;

    if (!token) {
      return await this.sessionsAuthRepository.createToken({ ...data });
    } else {
      const result = await this.sessionsAuthRepository.findToken(user_id, session_id, token);
      return result ? { token: result.token } : await this.sessionsAuthRepository.updateToken({ ...data });
    }
  }
}
