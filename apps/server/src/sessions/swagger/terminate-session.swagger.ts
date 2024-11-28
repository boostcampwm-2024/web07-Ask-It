import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const TerminateSessionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '세션 만료' }),
    ApiResponse({
      status: 200,
      description: '세션 만료작업 성공',
      schema: {
        example: {
          expired: true,
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: '세션 만료 작업 실패',
      schema: {
        example: {
          message: '세션 생성자만이 이 작업을 수행할 수 있습니다.',
        },
      },
    }),
  );
