import { Body, Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  private readonly REFRESH_TOKEN = 'refresh_token';

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const { userId, nickname } = await this.authService.validateUser(loginDto);
    const refreshToken = this.authService.generateRefreshToken(userId, nickname);
    const accessToken = await this.authService.generateAccessToken(refreshToken);

    response.cookie(this.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: false, //TODO : https
      maxAge: this.authService.getRefreshTokenExpireTime(),
    });

    return { accessToken };
  }

  @Post('token')
  async token(@Req() request: Request) {
    const refreshToken = request.cookies[this.REFRESH_TOKEN];
    const accessToken = await this.authService.generateAccessToken(refreshToken);
    return { accessToken };
  }

  @Post('logout')
  logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies[this.REFRESH_TOKEN];
    this.authService.removeRefreshToken(refreshToken);
    response.clearCookie(this.REFRESH_TOKEN);
    return { message: '로그아웃 되었습니다.' };
  }
}
