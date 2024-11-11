import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { EmailValidationDocs, NicknameValidationDocs } from './swagger/check-duplication.swagger';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { UsersService } from './users.service';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@ApiTags('Users')
@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CreateUserSwagger()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return {};
  }

  @Get('emails/:email')
  @EmailValidationDocs()
  async checkEmail(
    @Param('email')
    email: string,
  ) {
    return { exists: await this.usersService.validateUniqueEmail(email) };
  }

  @Get('nicknames/:nickname')
  @NicknameValidationDocs()
  async checkNickname(
    @Param('nickname')
    nickname: string,
  ) {
    return { exists: await this.usersService.validateUniqueNickname(nickname) };
  }
}
