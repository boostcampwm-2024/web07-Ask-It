import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SessionsController } from './sessions.controller';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

import { AuthModule } from '@auth/auth.module';
import { SessionTokenModule } from '@common/guards/session-token.module';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';
import { SocketModule } from '@socket/socket.module';

@Module({
  imports: [PrismaModule, JwtModule.register({}), AuthModule, SessionTokenModule, SocketModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRepository, SessionsAuthRepository],
  exports: [SessionsService],
})
export class SessionsModule {}
