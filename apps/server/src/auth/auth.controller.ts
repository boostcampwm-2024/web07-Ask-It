import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const { userId, nickname } = await this.authService.validateUser(loginDto);
    const refreshToken = this.authService.generateRefreshToken(userId, nickname);
    const accessToken = await this.authService.generateAccessToken(refreshToken);

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, //TODO : https
      maxAge: this.authService.getRefreshTokenExpireTime(),
    });

    return { accessToken };
  }
}
