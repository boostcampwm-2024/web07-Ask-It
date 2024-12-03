import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SessionsAuthController } from './sessions-auth.controller';
import { SessionsAuthRepository } from './sessions-auth.repository';
import { SessionsAuthService } from './sessions-auth.service';

import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { SessionTokenModule } from '@common/guards/session-token.module';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { SessionsRepository } from '@sessions/sessions.repository';

@Module({
  imports: [JwtModule.register({}), PrismaModule, SessionTokenModule],
  controllers: [SessionsAuthController],
  providers: [SessionsAuthService, SessionsAuthRepository, SessionTokenValidationGuard, SessionsRepository],
})
export class SessionsAuthModule {}
