import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

import { BaseDto } from '@common/base.dto';

export class CreateReplyDto extends BaseDto {
  @ApiProperty({
    example: '199',
    description: '질문 id',
    required: true,
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({
    example: '대지호님의 답변입니다!',
    description: 'reply의 내용',
    required: true,
  })
  @IsNotEmpty()
  body: string;
}
