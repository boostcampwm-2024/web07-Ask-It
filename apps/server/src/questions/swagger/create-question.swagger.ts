import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateQuestionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '새 질문 생성' }),
    ApiResponse({
      status: 201,
      description: '질문 생성 성공',
      schema: {
        example: {
          type: 'success',
          data: {},
        },
      },
    }),
  );
