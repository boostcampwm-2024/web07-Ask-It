import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtAuthException } from './exceptions/auth.exception';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    if (!token) throw JwtAuthException.missingAuthHeader();

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_SECRET });

      request['user'] = payload;
      return true;
    } catch (error) {
      throw JwtAuthException.invalidAccessToken();
    }
  }

  private extractToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
