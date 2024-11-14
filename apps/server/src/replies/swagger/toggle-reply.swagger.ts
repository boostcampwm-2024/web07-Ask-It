import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { ToggleReplyLikeDto } from '../dto/toggle-reply-like.dto';

export const ToggleReplyLikeSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '답글 좋아요 토글' }),
    ApiParam({
      name: 'id',
      required: true,
      description: '답글 ID',
      schema: { type: 'number' },
      example: 1,
    }),
    ApiBody({
      type: ToggleReplyLikeDto,
      description: '사용자 토큰 정보',
      examples: {
        example1: {
          summary: '요청 예시',
          description: '답글 좋아요를 토글하기 위한 사용자 토큰',
          value: {
            create_user_token: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
          },
        },
      },
    }),
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
                type: 'success',
                data: {
                  liked: true,
                  likesCount: 1,
                },
              },
            },
            unlikeSuccess: {
              summary: '좋아요 비활성화',
              description: '답글 좋아요가 비활성화된 경우',
              value: {
                type: 'success',
                data: {
                  liked: false,
                  likesCount: 0,
                },
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
                type: 'fail',
                error: {
                  message: 'reply_id를 찾을 수 없습니다.',
                },
              },
            },
            tokenNotFound: {
              summary: '사용자 토큰을 찾을 수 없음',
              description: '유효하지 않은 사용자 토큰인 경우',
              value: {
                type: 'fail',
                error: {
                  message: 'create_user_token를 찾을 수 없습니다.',
                },
              },
            },
          },
        },
      },
    }),
  );
