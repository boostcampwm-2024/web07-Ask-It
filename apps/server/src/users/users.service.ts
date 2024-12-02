import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';

import { PRISMA_ERROR_CODE } from '@src/prisma/prisma.error';
import { UserConflictException } from '@users/exceptions/user.exception';
import { UsersRepository } from '@users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      await this.userRepository.create({
        ...data,
        password: hashedPassword,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.UNIQUE_CONSTRAINT_VIOLATION
      ) {
        const [field] = (error.meta?.target as string[]) || [];
        throw UserConflictException.duplicateField(field);
      }
      throw error;
    }
  }

  async hasEmail(email: string) {
    return this.userRepository.findByEmail(email).then((user) => !!user);
  }

  async hasNickname(nickname: string) {
    return this.userRepository.findByNickname(nickname).then((user) => !!user);
  }
}
