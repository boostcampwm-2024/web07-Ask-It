import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  session_id: string;

  //로그인 기능 구현 시 @IsNotEmpty() 추가
  create_user_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  expired_at: Date;
}
