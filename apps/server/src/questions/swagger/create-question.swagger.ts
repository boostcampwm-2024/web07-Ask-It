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
            question_id: 7,
            session_id: '672e1c17-dcd4-8010-927c-84369a530f29',
            body: 'Nest와 Next는 다른건가요?',
            closed: false,
            pinned: false,
            created_at: '2024-11-14T05:49:29.856Z',
            isOwner: true,
            likesCount: 0,
            hasLiked: false,
            nickname: '익명',
            replies: [],
          },
        },
      },
    }),
  );
