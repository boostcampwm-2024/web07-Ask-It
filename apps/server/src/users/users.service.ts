import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
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

  async validateUniqueEmail(email: string) {
    return !!(await this.userRepository.findByEmail(email));
  }

  async validateUniqueNickname(nickname: string) {
    return !!(await this.userRepository.findByNickname(nickname));
  }
}
