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

  async hasEmail(email: string) {
    return this.userRepository.findByEmail(email).then((user) => !!user);
  }

  async hasNickname(nickname: string) {
    return this.userRepository.findByNickname(nickname).then((nickname) => !!nickname);
  }
}
