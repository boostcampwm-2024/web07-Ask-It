import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReplyDto {
  @ApiProperty({
    example: 'xcv90sdfskjwqjewq2',
    description: '참여한 세션의 id',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  session_id: string;

  @ApiProperty({
    example: '199',
    description: '질문 id',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  question_id: number;

  @ApiProperty({
    example: '1',
    description: '답글 id',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  reply_id: number;

  @ApiProperty({
    example: 'dsf89vc89sfsdjkh3',
    description: 'reply 수정을 요청한 유저의 토큰',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  user_token: string;

  @ApiProperty({
    example: '대지호님의 답변입니다!',
    description: 'reply의 내용',
    required: true,
  })
  @IsNotEmpty()
  body: string;
}
