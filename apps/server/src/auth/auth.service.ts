import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';

import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { InvalidCredentialsException, RefreshTokenException } from './exceptions/auth.exception';

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
    const now = new Date();
    const expiredTokens = Object.keys(this.refreshTokens).filter((token) => this.refreshTokens[token].expiredAt < now);

    expiredTokens.forEach((token) => {
      this.removeRefreshToken(token);
    });
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) throw InvalidCredentialsException.invalidEmail();

    const match = await bcrypt.compare(loginDto.password, user.password);
    if (!match) throw InvalidCredentialsException.invalidPassword();

    return { userId: user.user_id, nickname: user.nickname };
  }

  generateRefreshToken(userId: number, nickname: string) {
    const token = uuid4();
    this.refreshTokens[token] = { userId, nickname, expiredAt: new Date(Date.now() + this.REFRESH_TOKEN_CONFIG.EXPIRE_INTERVAL) };
    return token;
  }

  async generateAccessToken(refreshToken: string) {
    await this.validateRefreshToken(refreshToken);
    return this.jwtService.sign(this.refreshTokens[refreshToken], { expiresIn: '2d', secret: process.env.JWT_ACCESS_SECRET });
  }

  private async validateRefreshToken(refreshToken: string) {
    const tokenData = this.refreshTokens[refreshToken];
    if (!tokenData) throw RefreshTokenException.invalid();

    //FE측 cookie 만료 시간과 서버 측 만료 시간 간의 오차 대비
    if (tokenData.expiredAt < new Date()) {
      this.removeRefreshToken(refreshToken);
      throw RefreshTokenException.expired();
    }
  }

  hasValidRefreshToken(userId: number, nickname: string) {
    return Object.values(this.refreshTokens).some((data) => data.userId === userId && data.nickname === nickname && data.expiredAt > new Date());
  }

  removeRefreshToken(refreshToken: string) {
    delete this.refreshTokens[refreshToken];
  }
}
