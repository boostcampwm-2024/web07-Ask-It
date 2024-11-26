import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength, NotContains } from 'class-validator';

export class CheckNicknameDto {
  @ApiProperty({
    example: 'johnny',
    description: '중복 검사할 닉네임 (3-20자, 공백 포함 불가)',
    minLength: 3,
    maxLength: 20,
    required: true,
  })
  @IsString({ message: '닉네임은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '닉네임은 필수 입력 항목입니다.' })
  @MinLength(3, { message: '닉네임은 최소 3자 이상이어야 합니다.' })
  @MaxLength(20, { message: '닉네임은 최대 20자 이하이어야 합니다.' })
  @NotContains(' ', { message: '닉네임에는 공백이 포함될 수 없습니다.' })
  nickname: string;
}
