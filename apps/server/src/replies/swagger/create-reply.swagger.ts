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
            replyId: 3,
            body: '신지호 ',
            createdAt: '2024-11-18T13:01:05.505Z',
            isOwner: true,
            likesCount: 0,
            liked: false,
            nickname: '익명',
            isHost: false,
          },
        },
      },
    }),
  );
