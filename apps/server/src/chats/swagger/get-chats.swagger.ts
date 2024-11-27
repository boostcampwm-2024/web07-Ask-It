import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const GetChatsSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Chatting list 조회 API',
      description: `
채팅 목록을 가져오는 API입니다. Infinite scroll 구현을 위한 페이지네이션을 지원합니다.

- chatId 파라미터가 없는 경우: 최신 채팅 20개를 반환
- chatId 파라미터가 있는 경우: 해당 chatId보다 이전의 채팅 20개를 반환 (chatId보다 작은 ID를 가진 채팅)`,
    }),
    ApiParam({
      name: 'chatId',
      required: false,
      description: '기준이 되는 채팅 ID. 이 ID보다 이전의 채팅들을 조회합니다.',
      type: 'number',
      example: 3592,
    }),
    ApiQuery({
      name: 'sessionId',
      required: true,
      description: '채팅 세션 ID',
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '채팅 목록 조회 성공',
      schema: {
        example: {
          chats: [
            {
              chattingId: 3593,
              nickname: '익명',
              content: 'gggg',
            },
            {
              chattingId: 3592,
              nickname: 'jiho',
              content: 'asdfdasd',
            },
            {
              chattingId: 3591,
              nickname: '익명',
              content: 'd',
            },
          ],
        },
        properties: {
          chats: {
            type: 'array',
            description: '채팅 목록 (최대 20개)',
            items: {
              type: 'object',
              properties: {
                chattingId: {
                  type: 'number',
                  description: '채팅 고유 ID (내림차순 정렬)',
                },
                nickname: {
                  type: 'string',
                  description: '사용자 닉네임',
                },
                content: {
                  type: 'string',
                  description: '채팅 내용',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청 (chatId가 숫자가 아닌 경우)',
      schema: {
        example: {
          messages: ['Validation failed (numeric string is expected)'],
        },
      },
    }),
  );
