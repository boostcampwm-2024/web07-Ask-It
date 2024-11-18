import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const UpdateReplySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '답글 수정' }),
    ApiResponse({
      status: 200,
      description: '답글 수정 성공',
      schema: {
        example: {
          reply: {
            replyId: 1,
            createUserToken: '859a3450-32c2-4c04-b2a3-127f679a1905',
            sessionId: 'd340a812-ec52-45f1-824e-4ccbf338ed73',
            questionId: 1,
            body: '역시 신지호',
            createdAt: '2024-11-18T10:50:23.610Z',
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: '답글 수정 권한 없음',
      schema: {
        example: {
          forbidden: true,
        },
      },
    }),
  );
