import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const UpdateReplySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '답글 수정' }),
    ApiResponse({
      status: 200,
      description: '답글 수정 성공',
      schema: {
        example: {},
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
