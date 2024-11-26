import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, NotContains } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({
    example: 'john@example.com',
    description: '중복 검사할 이메일 주소 (공백 포함 불가, 이메일 형식만 허용)',
    required: true,
  })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  @IsString({ message: '이메일은 문자열이어야 합니다.' })
  @NotContains(' ', { message: '이메일에는 공백이 포함될 수 없습니다.' })
  email: string;
}
