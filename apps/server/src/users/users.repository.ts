import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseException } from '../common/exceptions/resource.exception';
import { PRISMA_ERROR_CODE } from '../prisma/prisma.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserConflictException } from './exceptions/user.exception';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      await this.prisma.user.create({ data });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.UNIQUE_CONSTRAINT_VIOLATION
      ) {
        const [field] = (error.meta?.target as string[]) || [];
        throw UserConflictException.duplicateField(field);
      }

      throw DatabaseException.create('user');
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw DatabaseException.read('user');
    }
  }

  async findByNickname(nickname: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { nickname },
      });
    } catch (error) {
      throw DatabaseException.read('user');
    }
  }
}
