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
            replyId: 13,
            createUserToken: 'dc706db3-db2e-494c-99f5-fa680a51dd45',
            sessionId: '2003544c-d901-4455-818d-d54af3784afa',
            questionId: 10,
            body: '수정합니다!',
            createdAt: '2024-11-18T15:31:30.663Z',
            deleted: false,
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
