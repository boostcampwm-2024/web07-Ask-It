import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return {
      type: 'success',
      data: {},
    };
  }

  @Get()
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
