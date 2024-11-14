import { Injectable } from '@nestjs/common';

import { SessionCreateData } from './interface/session-create-data.interface';

import { DatabaseException } from '@common/exceptions/resource.exception';
import { PrismaService } from '@prisma-alias/prisma.service';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: SessionCreateData) {
    try {
      return await this.prisma.session.create({ data });
    } catch (error) {
      throw DatabaseException.create('session');
    }
  }

  async findById(session_id: string) {
    try {
      return await this.prisma.session.findUnique({
        where: { session_id },
      });
    } catch (error) {
      throw DatabaseException.read('session');
    }
  }
}
