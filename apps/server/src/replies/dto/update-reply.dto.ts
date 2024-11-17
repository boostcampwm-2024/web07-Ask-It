import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

import { BaseDto } from '@src/common/base.dto';

export class UpdateReplyDto extends BaseDto {
  @ApiProperty({
    example: '199',
    description: '질문 id',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  question_id: number;

  @ApiProperty({
    example: '1',
    description: '답글 id',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  reply_id: number;

  @ApiProperty({
    example: '대지호님의 답변입니다!',
    description: 'reply의 내용',
    required: true,
  })
  @IsNotEmpty()
  body: string;
}
