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
          question: {
            questionId: 2,
            createUserToken: '859a3450-32c2-4c04-b2a3-127f679a1905',
            sessionId: 'd340a812-ec52-45f1-824e-4ccbf338ed73',
            body: '해치웠나..',
            closed: false,
            pinned: false,
            createdAt: '2024-11-18T13:02:27.369Z',
            isOwner: true,
            likesCount: 0,
            liked: false,
            nickname: '익명',
            replies: [],
          },
        },
      },
    }),
  );
