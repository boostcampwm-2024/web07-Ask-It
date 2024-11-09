import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  session_id: string;

  //로그인 기능 구현 시 @IsNotEmpty() 추가
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
