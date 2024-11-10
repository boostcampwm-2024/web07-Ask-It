import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';
import { SessionAuthDto } from './dto/session-auth.dto';

@Injectable()
export class SessionsAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(data: SessionAuthDto) {
    const newUserSessionToken = await this.prisma.userSessionToken.create({
      data: {
        ...data,
        user_id: data.user_id ? Number(data.user_id) : null,
        token: uuid4(),
      },
    });
    return newUserSessionToken.token;
  }

  async generateTokenForLoggedin(data: SessionAuthDto) {
    const result = await this.findToken(data.user_id, data.session_id, null);
    if (result) return result;
    const newToken = await this.generateToken(data);
    return newToken;
  }

  async findToken(user_id: number | null, session_id: string, token: string) {
    const whereClause: any = {
      session_id,
    };
    if (user_id != null) whereClause.user_id = Number(user_id);
    if (token) whereClause.token = token;
    const findedToken = await this.prisma.userSessionToken.findFirst({
      where: whereClause,
      select: {
        token: true,
      },
    });
    return findedToken?.token || null;
  }

  async deleteToken(token: string) {
    await this.prisma.userSessionToken.delete({
      where: { token },
    });
  }
}
