import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetQuestionSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '질문 정보 조회' }),
    ApiResponse({
      status: 200,
      description: '질문 조회 성공',
      schema: {
        example: {
          type: 'success',
          data: {
            questions: [
              {
                question_id: 1,
                session_id: '672e1c17-dcd4-8010-927c-84369a530f29',
                body: 'Question 1 body',
                closed: false,
                pinned: false,
                created_at: '2024-11-11T16:03:39.915Z',
                isOwner: false,
                likesCount: 1,
                hasLiked: true,
                nickname: 'user1',
                replies: [
                  {
                    reply_id: 1,
                    body: 'Reply 1 to Question 1',
                    created_at: '2024-11-11T16:04:02.532Z',
                    isOwner: false,
                    likesCount: 1,
                    hasLiked: true,
                    nickname: 'user1',
                  },
                ],
              },
              {
                question_id: 2,
                session_id: '672e1c17-dcd4-8010-927c-84369a530f29',
                body: 'Question 2 body',
                closed: false,
                pinned: false,
                created_at: '2024-11-11T16:03:39.915Z',
                isOwner: true,
                likesCount: 1,
                hasLiked: true,
                nickname: '익명',
                replies: [
                  {
                    reply_id: 2,
                    body: 'Reply 2 to Question 2',
                    created_at: '2024-11-11T16:04:02.532Z',
                    isOwner: true,
                    likesCount: 1,
                    hasLiked: true,
                    nickname: '익명',
                  },
                ],
              },
              {
                question_id: 3,
                session_id: '672e1c17-dcd4-8010-927c-84369a530f29',
                body: 'Question 3 body',
                closed: false,
                pinned: false,
                created_at: '2024-11-11T16:03:39.915Z',
                isOwner: true,
                likesCount: 1,
                hasLiked: true,
                nickname: '익명',
                replies: [],
              },
            ],
          },
        },
      },
    }),
  );
