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
              questionId: 3,
              sessionId: '2003544c-d901-4455-818d-d54af3784afa',
              body: '질문 수정할래요',
              closed: true,
              pinned: false,
              createdAt: '2024-11-18T14:18:22.604Z',
              isOwner: false,
              likesCount: 4,
              liked: false,
              nickname: 'user2',
              isHost: false,
              userId: 3,
              replies: [
                {
                  replyId: 4,
                  body: '답변달기 시도!!',
                  createdAt: '2024-11-18T14:25:12.879Z',
                  deleted: false,
                  isOwner: false,
                  likesCount: 0,
                  liked: false,
                  nickname: 'user2',
                  isHost: false,
                  userId: 3,
                },
              ],
            },
          ],
          isHost: true,
          expired: true,
          sessionTitle: '유영재의 세션',
        },
      },
    }),
  );
