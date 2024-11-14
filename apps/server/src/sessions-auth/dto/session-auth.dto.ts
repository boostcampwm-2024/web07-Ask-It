import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SessionAuthDto {
  @ApiProperty({
    example: 'ew9sqwe3dsf9xcv08xcv',
    description: 'session의 id',
    required: true,
  })
  @IsNotEmpty()
  session_id: string;

  @ApiProperty({
    example: 'wer8sdf8xcv8cxv8cxv89',
    description: 'client에서 확인한 해당 세션에 대한 토큰 값',
    required: false,
  })
  @IsOptional()
  token: string;
}
