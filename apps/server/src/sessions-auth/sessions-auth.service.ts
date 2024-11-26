import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { SessionAuthDto } from './dto/session-auth.dto';
import { UpdateHostDto } from './dto/update-host.dto';
import { SessionsAuthRepository } from './sessions-auth.repository';

import { SessionsRepository } from '@sessions/sessions.repository';

@Injectable()
export class SessionsAuthService {
  constructor(
    private readonly sessionsAuthRepository: SessionsAuthRepository,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

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

  async findUsers(sessionId: string) {
    const users = await this.sessionsAuthRepository.findUsersBySessionId(sessionId);
    return users.map(({ user, isHost }) => ({ ...user, isHost }));
  }

  async authorizeHost(userId: number, { sessionId, isHost, token }: UpdateHostDto) {
    if (!(await this.validateSuperHost(sessionId, token)))
      throw new ForbiddenException('세션 생성자만이 호스트 권한을 부여 할 수 있습니다.');
    const targetToken = await this.sessionsAuthRepository.findTokenByUserId(userId, sessionId);
    if (!targetToken) {
      throw new NotFoundException('존재하지 않는 userId입니다.');
    }
    const { user, isHost: updatedIsHost } = await this.sessionsAuthRepository.updateIsHost(targetToken, isHost);
    return { userId: user.userId, nickname: user.nickname, isHost: updatedIsHost };
  }

  async validateSuperHost(sessionId: string, token: string) {
    const [session, sessionAuth] = await Promise.all([
      this.sessionsRepository.findById(sessionId),
      this.sessionsAuthRepository.findByToken(token),
    ]);
    return session.createUserId === sessionAuth.userId;
  }
}
