import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: '세션을 만든 user의 id',
    description: '세션을 만든 user의 id',
    required: true,
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsNotEmpty()
  create_user_id: number;

  @ApiProperty({
    example: 'temporary title',
    description: 'session의 title',
    required: true,
  })
  @IsNotEmpty({ message: 'title이 입력되어야 합니다' })
  @IsString()
  title: string;
}
