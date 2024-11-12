import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'user_token_123',
    description: '질문을 작성한 사용자의 토큰',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '작성자 토큰은 필수입니다.' })
  create_user_token: string;

  @ApiProperty({
    example: 'session_456',
    description: '세션 ID',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '세션 ID는 필수입니다.' })
  session_id: string;

  @ApiProperty({
    example: '이것은 질문의 내용입니다.',
    description: '질문 본문 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '질문 본문은 필수입니다.' })
  body: string;

  @ApiProperty({
    example: false,
    description: '질문이 종료된 상태인지 여부',
    required: true,
  })
  @IsBoolean()
  closed: boolean;

  @ApiProperty({
    example: false,
    description: '질문이 고정된 상태인지 여부',
    required: true,
  })
  @IsBoolean()
  pinned: boolean;
}
