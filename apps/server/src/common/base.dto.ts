import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseDto {
  @ApiProperty({
    example: 'user_token_123',
    description: '사용자의 토큰',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '사용자 토큰은 필수입니다.' })
  token: string;

  @ApiProperty({
    example: 'session_456',
    description: '세션 ID',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '세션 ID는 필수입니다.' })
  sessionId: string;
}
