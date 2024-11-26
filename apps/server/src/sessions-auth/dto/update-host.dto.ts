import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { BaseDto } from '@common/base.dto';

export class UpdateHostDto extends BaseDto {
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true)
  isHost: boolean;
}
