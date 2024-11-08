import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateUserSwagger = {
  ApiOperation: ApiOperation({ summary: '새 사용자 생성' }),
  ApiResponse201: ApiResponse({
    status: 201,
    description: '사용자 생성 성공',
    schema: {
      example: { type: 'success', data: {} },
    },
  }),
  ApiResponse400: ApiResponse({
    status: 400,
    description: '잘못된 요청 (유효성 검사 실패)',
    schema: {
      example: {
        type: 'fail',
        error: {
          message: {
            email: '이메일 형식이 올바르지 않습니다.',
            nickname: '닉네임은 최소 3자 이상이어야 합니다.',
            password: '비밀번호는 최소 8자 이상이어야 합니다.',
          },
        },
      },
    },
  }),
};
