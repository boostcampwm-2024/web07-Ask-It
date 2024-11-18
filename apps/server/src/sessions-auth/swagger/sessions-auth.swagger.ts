import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const AuthSessionsSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '세션에 대한 사용자 검증' }),
    ApiResponse({
      status: 200,
      description: '세션 auth 요청 성공',
      schema: {
        example: {
          token: '21dad221-f42c-4edf-b1ca-e63e2360f943',
        },
      },
    }),
  );
