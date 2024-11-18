import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { BaseDto } from '@common/base.dto';

export class UpdateReplyBodyDto extends BaseDto {
  @ApiProperty({
    example: '대지호님의 답변입니다!',
    description: 'reply의 내용',
    required: true,
  })
  @IsNotEmpty()
  body: string;
}
