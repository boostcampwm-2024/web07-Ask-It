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

  async findToken(user_id: string | null, session_id: string, token: string) {
    const findedToken = await this.prisma.userSessionToken.findFirst({
      where: {
        session_id,
        ...(user_id ? { user_id } : {}),
        ...(token ? { token } : {}),
      },
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
