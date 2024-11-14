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
      name: 'session_id',
      required: true,
      description: '세션 ID',
      example: '672e1c17-dcd4-8010-927c-84369a530f29',
    }),
    ApiQuery({
      name: 'create_user_token',
      required: true,
      description: '세션을 생성한 사용자의 토큰',
      example: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
    }),
    ApiResponse({
      status: 200,
      description: '질문 삭제 성공',
      schema: {
        example: {
          type: 'success',
          data: {
            question: {
              question_id: 7,
              create_user_token: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
              session_id: '672e1c17-dcd4-8010-927c-84369a530f29',
              body: 'Nest와 Next는 다른건가요?',
              closed: false,
              pinned: false,
              created_at: '2024-11-14T05:49:29.856Z',
            },
          },
        },
      },
    }),
  );
