import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateUserSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '새 사용자 생성' }),
    ApiResponse({
      status: 201,
      description: '사용자 생성 성공',
      schema: {
        example: {},
      },
    }),
    ApiResponse({
      status: 409,
      description: '이메일 또는 닉네임 중복',
      schema: {
        example: {
          message: '이미 존재하는 email입니다.',
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
            '비밀번호는 꼭 필요한 값입니다.',
            '비밀번호는 최대 20자 이하이어야 합니다.',
            '비밀번호는 최소 8자 이상이어야 합니다.',
            '비밀번호는 필수 입력 항목입니다.',
            '비밀번호는 문자열이어야 합니다.',
          ],
        },
      },
    }),
  );
