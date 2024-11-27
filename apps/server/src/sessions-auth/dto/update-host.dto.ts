import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { BaseDto } from '@common/base.dto';

export class UpdateHostDto extends BaseDto {
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    example: 'true | false',
    description: '호스트 여부 반환',
    required: true,
  })
  isHost: boolean;
}
