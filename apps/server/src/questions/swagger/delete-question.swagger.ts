import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const DeleteQuestionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '질문 삭제' }),
    ApiParam({
      name: 'questionId',
      required: true,
      description: '삭제할 질문의 ID',
      example: 7,
    }),
    ApiQuery({
      name: 'sessionId',
      required: true,
      description: '세션 ID',
      example: '672e1c17-dcd4-8010-927c-84369a530f29',
    }),
    ApiQuery({
      name: 'token',
      required: true,
      description: '세션을 생성한 사용자의 토큰',
      example: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
    }),
    ApiResponse({
      status: 200,
      description: '질문 삭제 성공',
      schema: {
        example: {
        },
      },
    }),
  );
