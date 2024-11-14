import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { BaseDto } from '@common/base.dto';
export class UpdateQuestionBodyDto extends BaseDto {
  @ApiProperty({
    example: '이것은 질문의 수정된 내용입니다.',
    description: '질문 본문 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '질문 본문은 필수입니다.' })
  body: string;
}

export class UpdateQuestionPinnedDto extends BaseDto {
  @ApiProperty({
    example: true,
    description: '질문이 고정 상태인지 여부',
    required: true,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  pinned: boolean;
}

export class UpdateQuestionClosedDto extends BaseDto {
  @ApiProperty({
    example: false,
    description: '질문이 종료 상태인지 여부',
    required: true,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  closed: boolean;
}
