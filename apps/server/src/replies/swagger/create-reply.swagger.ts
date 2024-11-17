import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateReplySwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '새 답글 생성' }),
    ApiResponse({
      status: 201,
      description: '답글 생성 성공',
      schema: {
        example: {
          type: 'success',
          data: {
            reply_id: '생성한 reply의 id',
            is_host: true,
          },
        },
      },
    }),
  );
