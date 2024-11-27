import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateReplySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '새 답글 생성' }),
    ApiResponse({
      status: 201,
      description: '답글 생성 성공',
      schema: {
        example: {
          reply: {
            userId: 2,
            replyId: 217,
            body: '역시 지호님이네요 ',
            createdAt: '2024-11-27T08:18:29.176Z',
            isOwner: true,
            likesCount: 0,
            liked: false,
            deleted: false,
            questionId: 144,
            nickname: 'J291_최정민',
            isHost: true,
          },
        },
      },
    }),
  );
