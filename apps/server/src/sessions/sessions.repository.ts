import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseException } from '../common/exceptions/resource.exception';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SessionCreateInput) {
    try {
      return await this.prisma.session.create({ data });
    } catch (error) {
      throw DatabaseException.create('session');
    }
  }
}
