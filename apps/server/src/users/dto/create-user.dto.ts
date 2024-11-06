import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, NotContains } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @NotContains(' ')
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @NotContains(' ')
  nickname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @NotContains(' ')
  password: string;
}
