import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [UsersModule, PrismaModule, SessionsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
