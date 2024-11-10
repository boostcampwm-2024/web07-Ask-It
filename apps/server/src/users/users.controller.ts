import { BadRequestException, Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { CheckDuplicationSwagger } from './swagger/check-duplication.swagger';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { UsersService } from './users.service';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('Users')
@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CreateUserSwagger.ApiOperation
  @CreateUserSwagger.ApiResponse201
  @CreateUserSwagger.ApiResponse400
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return {};
  }

  @Get()
  @CheckDuplicationSwagger.ApiOperation
  @CheckDuplicationSwagger.ApiQueryEmail
  @CheckDuplicationSwagger.ApiQueryNickname
  @CheckDuplicationSwagger.ApiResponse200
  @CheckDuplicationSwagger.ApiResponse400
  async checkDuplication(@Query() validateUserDto: ValidateUserDto) {
    if (!validateUserDto.email && !validateUserDto.nickname) {
      throw new BadRequestException('중복확인을 위한 email 또는 nickname을 제공해주세요.');
    }

    if (validateUserDto.email && validateUserDto.nickname) {
      throw new BadRequestException('이메일 또는 닉네임 하나만 요청해 주세요.');
    }

    return { exists: await this.usersService.exist(validateUserDto) };
  }
}
