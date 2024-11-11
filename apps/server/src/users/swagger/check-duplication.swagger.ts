// swagger/user-validation.swagger.ts
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const EmailValidationSwagger = {
  ApiOperation: ApiOperation({ summary: '이메일 중복 확인' }),
  ApiParam: ApiParam({
    name: 'email',
    required: true,
    description: '중복 확인할 이메일',
  }),
  ApiResponse: ApiResponse({
    status: 200,
    content: {
      'application/json': {
        examples: {
          duplicated: {
            value: {
              type: 'success',
              data: { exists: true },
            },
            summary: '중복된 이메일',
          },
          available: {
            value: {
              type: 'success',
              data: { exists: false },
            },
            summary: '사용 가능한 이메일',
          },
        },
      },
    },
  }),
};

export const NicknameValidationSwagger = {
  ApiOperation: ApiOperation({ summary: '닉네임 중복 확인' }),
  ApiParam: ApiParam({
    name: 'nickname',
    required: true,
    description: '중복 확인할 닉네임',
  }),
  ApiResponse: ApiResponse({
    status: 200,
    content: {
      'application/json': {
        examples: {
          duplicated: {
            value: {
              type: 'success',
              data: { exists: true },
            },
            summary: '중복된 닉네임',
          },
          available: {
            value: {
              type: 'success',
              data: { exists: false },
            },
            summary: '사용 가능한 닉네임',
          },
        },
      },
    },
  }),
};
