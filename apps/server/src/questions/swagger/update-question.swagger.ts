import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const UpdateQuestionBodySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '질문 본문 수정' }),
    ApiResponse({
      status: 200,
      description: '질문 본문 수정 성공',
      schema: {
        example: {
          question: {
            questionId: 6,
            createUserToken: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
            sessionId: '672e1c17-dcd4-8010-927c-84369a530f29',
            body: '하이하이',
            closed: false,
            pinned: false,
            createdAt: '2024-11-14T05:47:54.079Z',
          },
        },
      },
    }),
  );

export const UpdateQuestionPinnedSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '질문 고정 상태 수정' }),
    ApiResponse({
      status: 200,
      description: '질문 고정 상태 수정 성공',
      schema: {
        example: {
          question: {
            questionId: 5,
            createUserToken: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
            sessionId: '672e1c17-dcd4-8010-927c-84369a530f29',
            body: '나는 누구인가',
            closed: true,
            pinned: true,
            createdAt: '2024-11-14T05:31:18.540Z',
          },
        },
      },
    }),
  );

export const UpdateQuestionClosedSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '질문 종료 상태 수정' }),
    ApiResponse({
      status: 200,
      description: '질문 종료 상태 수정 성공',
      schema: {
        example: {
          question: {
            questionId: 5,
            createUserToken: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
            sessionId: '672e1c17-dcd4-8010-927c-84369a530f29',
            body: '나는 누구인가',
            closed: true,
            pinned: false,
            createdAt: '2024-11-14T05:31:18.540Z',
          },
        },
      },
    }),
  );
