import { Module } from '@nestjs/common';

import { SessionTokenValidationPipe } from '@common/pipes/session-token-validation.pipe';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { SessionRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

@Module({
  imports: [PrismaModule],
  providers: [SessionTokenValidationPipe, SessionRepository, SessionsAuthRepository],
  exports: [SessionTokenValidationPipe, SessionRepository, SessionsAuthRepository],
})
export class SessionTokenModule {}
