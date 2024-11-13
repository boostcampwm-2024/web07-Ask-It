import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class GetQuestionDto {
  @ApiProperty({
    example: '672e1c17-dcd4-8010-927c-84369a530f29',
    description: '참여한 세션의 id',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({
    example: '8d9a6b17-f4f6-47c2-b080-9abf792b4c76',
    description: '세션에 참여한 사용자의 token',
    required: false,
  })
  @IsString()
  @IsOptional()
  userToken: string;
}
