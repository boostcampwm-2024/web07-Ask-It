import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SessionCreateInput) {
    return await this.prisma.session.create({ data });
  }
}
