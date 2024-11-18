import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  sessionId: string;

  @ApiProperty({
    example: 'temporary title',
    description: 'session의 title',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  @IsNotEmpty({ message: 'title이 입력되어야 합니다' })
  @IsString({ message: 'title은 문자열이어야 합니다.' })
  @MinLength(3, { message: 'title은 최소 3자 이상이어야 합니다.' })
  @MaxLength(20, { message: 'title은 최대 20자 이하이어야 합니다.' })
  title: string;
}
