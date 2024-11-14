import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, NotContains } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: '사용자의 이메일 주소 (공백 포함 불가, 이메일 형식만 허용)',
    required: true,
  })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  @IsString({ message: '이메일은 문자열이어야 합니다.' })
  @NotContains(' ', { message: '이메일에는 공백이 포함될 수 없습니다.' })
  email: string;

  @ApiProperty({
    example: 'johnny',
    description: '사용자의 닉네임 (3-20자, 공백 포함 불가)',
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

  @ApiProperty({
    example: 'password123',
    description: '사용자의 비밀번호 (8-20자, 공백 포함 불가)',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자 이하이어야 합니다.' })
  @NotContains(' ', { message: '비밀번호에는 공백이 포함될 수 없습니다.' })
  password: string;
}
