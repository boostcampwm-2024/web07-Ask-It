import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma-alias/prisma.module';

import { SessionsAuthController } from './sessions-auth.controller';
import { SessionsAuthRepository } from './sessions-auth.repository';
import { SessionsAuthService } from './sessions-auth.service';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [SessionsAuthController],
  providers: [SessionsAuthService, SessionsAuthRepository],
})
export class SessionsAuthModule {}
