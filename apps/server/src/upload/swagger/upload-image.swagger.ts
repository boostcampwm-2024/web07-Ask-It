import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const UploadImageSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: '이미지 업로드', description: '이미지를 S3에 업로드하고 URL을 반환합니다.' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description: '업로드할 이미지 파일',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '이미지 업로드 성공',
      schema: {
        example: {
          type: 'success',
          data: {
            url: 'https://ask-it-static.kr.object.ncloudstorage.com/uploads/1731848073193-1000000618.jpg',
          },
        },
      },
    }),
  );
