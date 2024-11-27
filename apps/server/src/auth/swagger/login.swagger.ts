import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const LoginSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '사용자 로그인' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'user@example.com',
          },
          password: {
            type: 'string',
            example: 'myPassword123!',
          },
        },
        required: ['email', 'password'],
      },
    }),
    ApiResponse({
      status: 200,
      description: '로그인 성공',
      schema: {
        example: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJuaWNrbmFtZSI6InVzZXIyIiwiZXhwaXJlZEF0IjoiMjAyNC0xMS0xOVQxOTowNzoxOC41ODdaIiwiaWF0IjoxNzMxNDM4NDQ0LCJleHAiOjE3MzE0MzkzNDR9.yqTC5TMMzfSiSiT1OGZCSjH7LjNZ4VPHSv5m_9VGGf4',
          userId: 3,
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청 (유효성 검사 실패)',
      schema: {
        example: {
          messages: [
            '올바른 이메일 형식이 아닙니다.',
            '이메일은 필수 입력 항목입니다.',
            '비밀번호는 필수 입력 항목입니다.',
          ],
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '인증 실패',
      schema: {
        example: {
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        },
      },
    }),
  );

export const TokenRefreshSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Access Token 갱신' }),
    ApiCookieAuth('refreshToken'),
    ApiResponse({
      status: 200,
      description: '토큰 갱신 성공',
      schema: {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          userId: 3,
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Refresh Token 만료 또는 유효하지 않음',
      schema: {
        example: {
          message: 'Refresh token이 만료되었습니다.',
        },
      },
    }),
  );

export const LogoutSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '로그아웃' }),
    ApiResponse({
      status: 200,
      description: '로그아웃 성공',
      schema: {
        example: {
          message: '로그아웃 되었습니다.',
        },
      },
    }),
  );
