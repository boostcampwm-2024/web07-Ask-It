import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseDto } from '@common/base.dto';

export class CreateQuestionDto extends BaseDto {
  @ApiProperty({
    example: '이것은 질문의 내용입니다.',
    description: '질문 본문 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '질문 본문은 필수입니다.' })
  body: string;
}
