import { ForbiddenException, Injectable, PipeTransform } from '@nestjs/common';

import { SessionRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Injectable()
export class SessionTokenValidationPipe implements PipeTransform {
  constructor(
    private readonly sessionsRepository: SessionRepository,
    private readonly sessionsAuthRepository: SessionsAuthRepository,
  ) {}

  async transform(value: any) {
    const { session_id, create_user_token } = value;

    const session = await this.sessionsRepository.findById(session_id);
    if (!session) {
      throw new ForbiddenException('세션이 존재하지 않습니다.');
    }

    const currentTime = new Date();
    if (session.expired_at && session.expired_at < currentTime) {
      throw new ForbiddenException('세션이 만료되었습니다.');
    }

    const token = await this.sessionsAuthRepository.findToken(null, session_id, create_user_token);
    if (!token) {
      throw new ForbiddenException('해당 세션에 접근할 권한이 없습니다.');
    }

    return value;
  }
}
