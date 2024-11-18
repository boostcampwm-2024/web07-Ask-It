import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SessionsController } from './sessions.controller';
import { SessionRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

import { PrismaModule } from '@prisma-alias/prisma.module';
@Module({
  imports: [PrismaModule, JwtModule.register({}), AuthModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionRepository],
  exports: [SessionsService],
})
export class SessionsModule {}
