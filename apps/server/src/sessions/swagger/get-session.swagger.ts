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
          sessionData: [
            {
              sessionId: 'session1',
              title: 'Session 1',
              createdAt: {
                year: 2024,
                month: 11,
                day: 1,
              },
              expired: true,
            },
            {
              sessionId: 'session2',
              title: 'Session 2',
              createdAt: {
                year: 2024,
                month: 11,
                day: 5,
              },
              expired: false,
            },
          ],
        },
      },
    }),
  );
