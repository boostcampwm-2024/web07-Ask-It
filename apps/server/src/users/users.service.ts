import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async exist(data: ValidateUserDto) {
    if (data.email) return !!(await this.userRepository.findByEmail(data.email));
    if (data.nickname) return !!(await this.userRepository.findByNickname(data.nickname));
    return false;
  }
}
