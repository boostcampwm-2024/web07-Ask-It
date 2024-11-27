import { Body, Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginSwagger, LogoutSwagger, TokenRefreshSwagger } from './swagger/login.swagger';

import { TransformInterceptor } from '@common/interceptors/transform.interceptor';

@ApiTags('Auth')
@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  private readonly REFRESH_TOKEN = 'refreshToken';

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @LoginSwagger()
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const { userId, nickname } = await this.authService.validateUser(loginDto);
    const refreshToken = this.authService.generateRefreshToken(userId, nickname);
    const accessToken = await this.authService.generateAccessToken(refreshToken);

    response.cookie(this.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: false, //TODO : https
      maxAge: this.authService.getRefreshTokenExpireTime(),
    });

    return { accessToken, userId };
  }

  @Post('token')
  @TokenRefreshSwagger()
  async token(@Req() request: Request) {
    const refreshToken = request.cookies[this.REFRESH_TOKEN];
    const accessToken = await this.authService.generateAccessToken(refreshToken);
    const userId = this.authService.getInfo(refreshToken);
    return { accessToken, userId };
  }

  @Post('logout')
  @LogoutSwagger()
  logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies[this.REFRESH_TOKEN];
    this.authService.removeRefreshToken(refreshToken);
    response.clearCookie(this.REFRESH_TOKEN);
    return { message: '로그아웃 되었습니다.' };
  }
}
