import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

import { RepliesRepository } from '../replies.repository';

@Injectable()
export class ReplyExistenceGuard implements CanActivate {
  constructor(private readonly repliesRepository: RepliesRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const session_id = request.body.session_id || request.query.session_id;
    const question_id = parseInt(request.body.question_id || request.query.question_id, 10);
    const reply_id = parseInt(request.body.reply_id || request.query.reply_id, 10);

    const reply = await this.repliesRepository.findReplyByQuestionIdAndSession(reply_id, question_id, session_id);
    if (!reply) {
      throw new NotFoundException('해당 답변이 존재하지 않습니다.');
    }

    request.reply = reply;
    return true;
  }
}
