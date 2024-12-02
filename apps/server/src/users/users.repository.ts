import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    await this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByNickname(nickname: string) {
    return await this.prisma.user.findUnique({
      where: { nickname },
    });
  }
}
