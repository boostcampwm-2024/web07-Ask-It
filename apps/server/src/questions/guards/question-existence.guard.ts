import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

import { QuestionsRepository } from '@questions/questions.repository';

@Injectable()
export class QuestionExistenceGuard implements CanActivate {
  constructor(private readonly questionRepository: QuestionsRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const questionId = parseInt(request.params.questionId || request.body.questionId, 10);
    const sessionId = request.body.sessionId || request.query.sessionId;

    const question = await this.questionRepository.findByIdAndSession(questionId, sessionId);
    if (!question) {
      throw new NotFoundException('해당 질문이 존재하지 않습니다.');
    }

    request.question = question;
    return true;
  }
}
