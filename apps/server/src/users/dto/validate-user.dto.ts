import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength, NotContains } from 'class-validator';

export class ValidateUserDto {
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: '중복 확인할 이메일 주소',
  })
  @IsOptional()
  @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
  @NotContains(' ', { message: '이메일에는 공백이 포함될 수 없습니다.' })
  email: string;

  @ApiPropertyOptional({
    example: 'username',
    description: '중복 확인할 닉네임',
    minLength: 3,
    maxLength: 20,
  })
  @IsOptional()
  @IsString({ message: '닉네임은 문자열이어야 합니다.' })
  @MinLength(3, { message: '닉네임은 최소 3자 이상이어야 합니다.' })
  @MaxLength(20, { message: '닉네임은 최대 20자 이하이어야 합니다.' })
  @NotContains(' ', { message: '닉네임에는 공백이 포함될 수 없습니다.' })
  nickname: string;
}
