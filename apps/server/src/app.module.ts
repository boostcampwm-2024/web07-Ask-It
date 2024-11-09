import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { SessionsModule } from './sessions/sessions.module';
import { SessionsAuthModule } from './sessions-auth/sessions-auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [UsersModule, PrismaModule, SessionsModule, SessionsAuthModule, SessionsAuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
