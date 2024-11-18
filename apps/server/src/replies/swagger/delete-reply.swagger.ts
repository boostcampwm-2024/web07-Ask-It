import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const DeleteReplySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '답글 삭제' }),
    ApiResponse({
      status: 200,
      description: '답글 삭제 성공',
      schema: {
        example: {},
      },
    }),
    ApiResponse({
      status: 403,
      description: '답글 삭제 권한 없음',
      schema: {
        example: {
          forbidden: true,
        },
      },
    }),
  );
