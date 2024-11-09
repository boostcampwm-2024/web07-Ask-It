import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  session_id: string;

  @IsNotEmpty()
  @IsString()
  create_user_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  expired_at: Date;
}
