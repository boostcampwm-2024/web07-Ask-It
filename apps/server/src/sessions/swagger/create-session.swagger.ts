import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateSessionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '새 세션 생성' }),
    ApiResponse({
      status: 201,
      description: '세션 생성 성공',
      schema: {
        example: {
          type: 'success',
          data: {
            sessionId: '[생성된 sessionId]',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청 (유효성 검사 실패)',
      schema: {
        example: {
          type: 'fail',
          error: {
            message: {
              title: 'title이 입력되어야 합니다',
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'JWT 인증 실패',
      schema: {
        example: {
          type: 'fail',
          error: {
            message: '유효하지 않은 액세스 토큰입니다.',
          },
        },
      },
    }),
  );
