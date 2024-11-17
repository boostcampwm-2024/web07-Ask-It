import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

import { QuestionsRepository } from '@questions/questions.repository';

@Injectable()
export class QuestionExistenceGuard implements CanActivate {
  constructor(private readonly questionRepository: QuestionsRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const question_id = parseInt(request.params.questionId, 10);
    const session_id = request.body.session_id || request.query.session_id;

    const question = await this.questionRepository.findByIdAndSession(question_id, session_id);
    if (!question) {
      throw new NotFoundException('해당 질문이 존재하지 않습니다.');
    }

    request.question = question;
    return true;
  }
}
