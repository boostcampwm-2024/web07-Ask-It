import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetSessionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '마이페이지 세션' }),
    ApiResponse({
      status: 201,
      description: '세션 조회 성공',
      schema: {
        example: {
          type: 'success',
          data: {
            sessionId: '[user_id에 해당하는 sessionId]',
          },
        },
      },
    }),
  );
