import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';

import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';

interface RefreshTokenData {
  userId: number;
  nickname: string;
  expiredAt: Date;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private refreshTokens: Record<string, RefreshTokenData> = {};
  private readonly REFRESH_TOKEN_CONFIG = {
    EXPIRE_INTERVAL: 7 * 24 * 60 * 60 * 1000, // 7일
    CLEANUP_INTERVAL: 60 * 60 * 1000, // 1시간
  } as const;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  getRefreshTokenExpireTime() {
    return this.REFRESH_TOKEN_CONFIG.EXPIRE_INTERVAL;
  }

  onModuleInit() {
    this.startPeriodicCleanup();
  }

  private startPeriodicCleanup() {
    setInterval(() => {
      this.cleanupExpiredTokens();
    }, this.REFRESH_TOKEN_CONFIG.CLEANUP_INTERVAL);
  }

  private cleanupExpiredTokens() {
    const expiredTokens = Object.entries(this.refreshTokens)
      .filter(([_, data]) => data.expiredAt < new Date())
      .map(([token, _]) => token);

    expiredTokens.forEach((token) => {
      this.removeRefreshToken(token);
    });
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('존재하지 않는 email입니다.');

    const match = await bcrypt.compare(loginDto.password, user.password);
    if (!match) throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');

    return { userId: user.user_id, nickname: user.nickname };
  }

  generateRefreshToken(userId: number, nickname: string) {
    const token = uuid4();
    this.refreshTokens[token] = { userId, nickname, expiredAt: new Date(Date.now() + this.REFRESH_TOKEN_CONFIG.EXPIRE_INTERVAL) };
    return token;
  }

  async generateAccessToken(refreshToken: string) {
    await this.validateRefreshToken(refreshToken);
    return this.jwtService.sign(this.refreshTokens[refreshToken], { expiresIn: '1m', secret: process.env.JWT_ACCESS_SECRET });
  }

  private async validateRefreshToken(refreshToken: string) {
    const tokenData = this.refreshTokens[refreshToken];
    if (!tokenData) throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');

    //FE측 cookie 만료 시간과 서버 측 만료 시간 간의 오차 대비
    if (tokenData.expiredAt < new Date()) {
      this.removeRefreshToken(refreshToken);
      throw new UnauthorizedException('만료된 리프레시 토큰입니다.');
    }
  }

  private removeRefreshToken(refreshToken: string) {
    delete this.refreshTokens[refreshToken];
  }
}
