import { Module } from '@nestjs/common';

import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { SessionsRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Module({
  imports: [PrismaModule],
  providers: [SessionTokenValidationGuard, SessionsRepository, SessionsAuthRepository],
  exports: [SessionTokenValidationGuard, SessionsRepository, SessionsAuthRepository],
})
export class SessionTokenModule {}
