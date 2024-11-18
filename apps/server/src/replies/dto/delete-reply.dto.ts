import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

import { BaseDto } from '@common/base.dto';

export class DeleteReplyDto extends BaseDto {
  @ApiProperty({
    example: '199',
    description: '질문 id',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  questionId: number;

  @ApiProperty({
    example: '1',
    description: '답글 id',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  replyId: number;
}
