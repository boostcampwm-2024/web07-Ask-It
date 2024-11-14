import { IsEmail, IsNotEmpty, IsString, NotContains } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  @IsString({ message: '이메일은 문자열이어야 합니다.' })
  @NotContains(' ', { message: '이메일에는 공백이 포함될 수 없습니다.' })
  email: string;

  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @NotContains(' ', { message: '비밀번호에는 공백이 포함될 수 없습니다.' })
  password: string;
}
