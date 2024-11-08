import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '새 사용자 생성' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '사용자 생성 성공', schema: { example: { type: 'success', data: {} } } })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return {
      type: 'success',
      data: {},
    };
  }

  @Get()
  @ApiOperation({ summary: '이메일 또는 닉네임 중복 확인' })
  @ApiQuery({ name: 'email', required: false, description: '중복 확인할 이메일 주소' })
  @ApiQuery({ name: 'nickname', required: false, description: '중복 확인할 닉네임' })
  @ApiResponse({ status: 200, description: '중복 확인 성공', schema: { example: { type: 'success', data: { exists: false } } } })
  @ApiResponse({ status: 400, description: '잘못된 요청: email 또는 nickname 하나만 제공해야 합니다.' })
  async checkDuplication(@Query() validateUserDto: ValidateUserDto) {
    if (!validateUserDto.email && !validateUserDto.nickname) throw new BadRequestException('중복확인을 위한 email 또는 nickname을 제공해주세요.');

    if (validateUserDto.email && validateUserDto.nickname) throw new BadRequestException('이메일 또는 닉네임 하나만 요청해 주세요.');
    return {
      type: 'success',
      data: {
        exists: await this.usersService.exist(validateUserDto),
      },
    };
  }
}
