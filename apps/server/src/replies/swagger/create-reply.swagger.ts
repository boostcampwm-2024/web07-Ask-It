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
            replyId: 14,
            body: '다 대상현님 덕분이죠.',
            createdAt: '2024-11-19T02:47:23.386Z',
            isOwner: true,
            likesCount: 0,
            liked: false,
            deleted: false,
            nickname: 'user2',
            isHost: false,
          },
        },
      },
    }),
  );
