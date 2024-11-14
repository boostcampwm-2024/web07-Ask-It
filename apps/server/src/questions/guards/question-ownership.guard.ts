import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class QuestionOwnershipGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const create_user_token = request.body.create_user_token || request.query.create_user_token;
    const question = request.question;

    if (question.create_user_token !== create_user_token) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}
