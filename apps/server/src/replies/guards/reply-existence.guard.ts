import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

import { RepliesRepository } from '@replies/replies.repository';

@Injectable()
export class ReplyExistenceGuard implements CanActivate {
  constructor(private readonly repliesRepository: RepliesRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const replyId = parseInt(request.params.replyId, 10);
    const sessionId = request.body.sessionId || request.query.sessionId;

    const reply = await this.repliesRepository.findReplyByIdAndSessionId(replyId, sessionId);
    if (!reply) {
      throw new NotFoundException('해당 답변이 존재하지 않습니다.');
    }

    request.reply = reply;
    return true;
  }
}
