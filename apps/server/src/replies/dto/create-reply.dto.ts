import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyDto {
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
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsNotEmpty()
  question_id: number;

  @ApiProperty({
    example: 'dsf89vc89sfsdjkh3',
    description: 'reply를 작성한 유저의 토큰',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  create_user_token: string;

  @ApiProperty({
    example: '대지호님의 답변입니다!',
    description: 'reply의 내용',
    required: true,
  })
  @IsNotEmpty()
  body: string;
}
