import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';
import { SessionAuthDto } from './dto/session-auth.dto';

@Injectable()
export class SessionsAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createToken(data: SessionAuthDto) {
    const result = await this.prisma.userSessionToken.create({
      data: {
        ...data,
        token: uuid4(), // 새로운 UUID 생성하여 token 필드에 할당
      },
    });
    return result.token;
  }

  async updateToken(data: SessionAuthDto) {
    const newToken = uuid4();
    await this.prisma.userSessionToken.updateMany({
      where: {
        session_id: data.session_id,
        user_id: data.user_id,
      },
      data: {
        token: newToken,
      },
    });
    return newToken;
  }

  async findToken(user_id: string | null, session_id: string, token: string) {
    return await this.prisma.userSessionToken.findFirst({
      where: {
        session_id,
        token,
        ...(user_id !== null && { user_id }),
      },
    });
  }
}
