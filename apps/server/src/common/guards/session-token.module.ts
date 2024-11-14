import { Module } from '@nestjs/common';

import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { SessionRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Module({
  imports: [PrismaModule],
  providers: [SessionTokenValidationGuard, SessionRepository, SessionsAuthRepository],
  exports: [SessionTokenValidationGuard, SessionRepository, SessionsAuthRepository],
})
export class SessionTokenModule {}
