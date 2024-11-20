import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ToggleReplyLikeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '답글 좋아요 토글' }),
    ApiResponse({
      status: 201,
      description: '좋아요 토글 성공',
      content: {
        'application/json': {
          examples: {
            likeSuccess: {
              summary: '좋아요 활성화',
              description: '답글 좋아요가 활성화된 경우',
              value: {
                liked: true,
                likesCount: 1,
              },
            },
            unlikeSuccess: {
              summary: '좋아요 비활성화',
              description: '답글 좋아요가 비활성화된 경우',
              value: {
                liked: false,
                likesCount: 0,
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '요청 실패',
      content: {
        'application/json': {
          examples: {
            replyNotFound: {
              summary: '답글을 찾을 수 없음',
              description: '해당 ID의 답글이 존재하지 않는 경우',
              value: {
                message: 'replyId를 찾을 수 없습니다.',
              },
            },
            tokenNotFound: {
              summary: '사용자 토큰을 찾을 수 없음',
              description: '유효하지 않은 사용자 토큰인 경우',
              value: {
                message: 'createUserToken를 찾을 수 없습니다.',
              },
            },
          },
        },
      },
    }),
  );
