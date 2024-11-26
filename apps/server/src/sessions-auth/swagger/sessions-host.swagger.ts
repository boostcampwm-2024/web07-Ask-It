import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const SessionsHostSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '호스트 여부 변경' }),
    ApiResponse({
      status: 200,
      description: '호스트 여부 변경 성공',
      schema: {
        example: {
          user: {
            userId: 31,
            nickname: 'minsuhan',
            isHost: false,
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: '호스트 여부 변경 실패',
      schema: {
        example: {
          message: '세션 생성자만이 호스트 권한을 부여 할 수 있습니다.',
        },
      },
    }),
  );
