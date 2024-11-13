import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SessionsAuthController } from './sessions-auth.controller';
import { SessionsAuthRepository } from './sessions-auth.repository';
import { SessionsAuthService } from './sessions-auth.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [SessionsAuthController],
  providers: [SessionsAuthService, SessionsAuthRepository],
})
export class SessionsAuthModule {}
