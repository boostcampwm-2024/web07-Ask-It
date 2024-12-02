import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { SessionsRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Injectable()
export class SessionTokenValidationGuard implements CanActivate {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly sessionsAuthRepository: SessionsAuthRepository,
  ) {}

  async validateSessionToken(sessionId: string, token: string) {
    if (!sessionId || !token) {
      throw new ForbiddenException('세션 ID와 사용자 토큰이 필요합니다.');
    }

    const session = await this.sessionsRepository.findById(sessionId);
    if (!session) {
      throw new ForbiddenException('세션이 존재하지 않습니다.');
    }

    const currentTime = new Date();
    if (session.expiredAt && session.expiredAt < currentTime) {
      throw new ForbiddenException('세션이 만료되었습니다.');
    }

    const userSessionToken = await this.sessionsAuthRepository.findByToken(token);
    if (!userSessionToken || userSessionToken.sessionId !== sessionId) {
      throw new ForbiddenException('해당 세션에 접근할 권한이 없습니다.');
    }
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.body?.sessionId || request.query?.sessionId || request.params?.sessionId;
    const token = request.body?.token || request.query?.token;

    await this.validateSessionToken(sessionId, token);
    return true;
  }
}
