import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { SessionRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Injectable()
export class SessionTokenValidationGuard implements CanActivate {
  constructor(
    private readonly sessionsRepository: SessionRepository,
    private readonly sessionsAuthRepository: SessionsAuthRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const session_id = request.body?.session_id || request.query?.session_id;
    const create_user_token = request.body?.create_user_token || request.query?.create_user_token;

    if (!session_id || !create_user_token) {
      throw new ForbiddenException('세션 ID와 사용자 토큰이 필요합니다.');
    }

    const session = await this.sessionsRepository.findById(session_id);
    if (!session) {
      throw new ForbiddenException('세션이 존재하지 않습니다.');
    }

    const currentTime = new Date();
    if (session.expired_at && session.expired_at < currentTime) {
      throw new ForbiddenException('세션이 만료되었습니다.');
    }

    const token = await this.sessionsAuthRepository.findByToken(create_user_token);
    if (!token || token.session_id !== session_id) {
      throw new ForbiddenException('해당 세션에 접근할 권한이 없습니다.');
    }

    return true;
  }
}
