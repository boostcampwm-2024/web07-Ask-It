import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';

interface RefreshTokenData {
  userId: number;
  nickname: string;
}

@Injectable()
export class AuthService {
  private refreshTokens: Record<string, RefreshTokenData> = {};

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('존재하지 않는 email입니다.');

    const match = await bcrypt.compare(loginDto.password, user.password);
    if (!match) throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');

    return { userId: user.user_id, nickname: user.nickname };
  }

  generateRefreshToken(userId: number, nickname: string) {
    this.removeRefreshTokenByUserId(userId);
    const token = this.jwtService.sign({}, { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET });
    this.refreshTokens[token] = { userId, nickname };
    return token;
  }

  async generateAccessToken(refreshToken: string) {
    await this.validateRefreshToken(refreshToken);
    return this.jwtService.sign(this.refreshTokens[refreshToken], { expiresIn: '1m', secret: process.env.JWT_ACCESS_SECRET });
  }

  private async validateRefreshToken(refreshToken: string) {
    const tokenData = this.refreshTokens[refreshToken];
    if (!tokenData) throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');

    try {
      await this.jwtService.verifyAsync(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    } catch (error) {
      this.removeRefreshToken(refreshToken);
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
  }

  private removeRefreshTokenByUserId(userId: number) {
    Object.entries(this.refreshTokens).forEach(([token, data]) => {
      if (data.userId === userId) this.removeRefreshToken(token);
    });
  }

  private removeRefreshToken(refreshToken: string) {
    delete this.refreshTokens[refreshToken];
  }
}
