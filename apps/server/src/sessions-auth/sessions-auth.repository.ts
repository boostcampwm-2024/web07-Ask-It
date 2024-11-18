import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';

import { DatabaseException } from '@common/exceptions/resource.exception';

@Injectable()
export class SessionsAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(user_id: number | null, session_id: string) {
    const newUserSessionToken = await this.prisma.userSessionToken.create({
      data: {
        session_id: session_id,
        user_id: user_id ? user_id : null,
        token: uuid4(),
      },
    });
    return newUserSessionToken.token;
  }

  async findTokenByUserId(user_id: number, session_id: string) {
    const record = await this.prisma.userSessionToken.findFirst({
      where: {
        user_id: user_id,
        session_id: session_id,
      },
      select: {
        token: true,
      },
    });
    return record?.token || null;
  }
  async findTokenByToken(session_id: string, token: string) {
    const record = await this.prisma.userSessionToken.findFirst({
      where: {
        token: token,
        session_id: session_id,
        user_id: null,
      },
      select: {
        token: true,
      },
    });
    return record?.token || null;
  }

  async findByToken(token: string) {
    try {
      return await this.prisma.userSessionToken.findFirst({
        where: {
          token: token,
        },
      });
    } catch (error) {
      throw DatabaseException.read('sessions-auth');
    }
  }

  async findUserByToken(token: string) {
    try {
      const record = await this.prisma.userSessionToken.findFirst({
        where: {
          token: token,
        },
        select: {
          user_id: true,
        },
      });
      return record?.user_id || null;
    } catch (error) {
      throw DatabaseException.read('sessions-auth');
    }
  }

  async findTokenByUserIdAndToken(user_id: number, session_id: string, token: string) {
    const record = await this.prisma.userSessionToken.findFirst({
      where: {
        token: token,
        session_id: session_id,
        user_id: user_id,
      },
      select: {
        token: true,
      },
    });
    if (record === null) return await this.findTokenByUserId(user_id, session_id);
    return record?.token || null;
  }
  async findByIdAndSession(reply_id: number, session_id: string) {
    try {
      return await this.prisma.reply.findUnique({
        where: { reply_id: reply_id, session_id: session_id },
      });
    } catch (error) {
      throw DatabaseException.read('reply');
    }
  }
}
