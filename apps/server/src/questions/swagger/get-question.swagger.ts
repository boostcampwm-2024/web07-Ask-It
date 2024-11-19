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
          questions: [
            {
              questionId: 1,
              sessionId: 'd340a812-ec52-45f1-824e-4ccbf338ed73',
              body: '해치웠나..',
              closed: false,
              pinned: false,
              createdAt: '2024-11-18T10:45:32.392Z',
              isOwner: true,
              likesCount: 0,
              liked: false,
              nickname: '익명',
              isHost: false,
              replies: [
                {
                  replyId: 13,
                  body: '다 대상현님 덕분이죠.',
                  createdAt: '2024-11-18T15:31:30.663Z',
                  deleted: false,
                  isOwner: true,
                  likesCount: 0,
                  liked: false,
                  nickname: 'user2',
                  isHost: false,
                },
              ],
            },
          ],
          isHost: false,
        },
      },
    }),
  );
