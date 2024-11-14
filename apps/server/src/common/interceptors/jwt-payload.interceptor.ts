import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable()
export class JwtPayloadInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.startsWith('Bearer ')
      ? request.headers.authorization.split(' ')[1]
      : undefined;

    if (!token) {
      return next.handle();
    }

    return from(this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_SECRET })).pipe(
      map((payload) => {
        const userPayload = {
          userId: payload.userId ?? null,
          nickname: payload.nickname ?? null,
          ...payload,
        };
        request['user'] = userPayload; // request 객체에 userPayload 추가
      }),
      switchMap(() => next.handle()), // next.handle()을 자연스럽게 반환
    );
  }
}
