import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const CheckDuplicationSwagger = {
  ApiOperation: ApiOperation({ summary: '이메일 또는 닉네임 중복 확인' }),
  ApiQueryEmail: ApiQuery({
    name: 'email',
    required: false,
    description: '중복 확인할 이메일 주소',
  }),
  ApiQueryNickname: ApiQuery({
    name: 'nickname',
    required: false,
    description: '중복 확인할 닉네임',
  }),
  ApiResponse200: ApiResponse({
    status: 200,
    description: '중복 확인 성공',
    schema: {
      example: { type: 'success', data: { exists: 'true || false' } },
    },
  }),

  ApiResponse400: ApiResponse({
    status: 400,
    description: '잘못된 요청: email 또는 nickname 하나만 제공해야 합니다.',
  }),
};
