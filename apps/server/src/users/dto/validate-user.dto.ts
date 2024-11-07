import { IsEmail, IsOptional, IsString, MaxLength, MinLength, NotContains } from 'class-validator';

export class ValidateUserDto {
  @IsOptional()
  @IsEmail()
  @NotContains(' ')
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @NotContains(' ')
  nickname: string;
}
