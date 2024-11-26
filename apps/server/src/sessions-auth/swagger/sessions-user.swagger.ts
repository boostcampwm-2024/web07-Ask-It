import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const SessionsUserSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '세션에 참여한 사용자 반환' }),
    ApiResponse({
      status: 200,
      description: '세션참여한 사용자 반환 요청 성공',
      schema: {
        example: {
          users: [
            { userId: 13, nickname: 'crong', isHost: true },
            { userId: 14, nickname: 'dangle', isHost: true },
            { userId: 15, nickname: '대상현', isHost: false },
          ],
        },
      },
    }),
  );
