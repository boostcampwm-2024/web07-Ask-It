import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class QuestionOwnershipGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.body.token || request.query.token;
    const question = request.question;

    if (question.createUserToken !== token) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}
