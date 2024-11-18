import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ReplyOwnershipGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.body.token || request.query.token;
    const reply = request.reply;

    if (reply.createUserToken !== token) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}
