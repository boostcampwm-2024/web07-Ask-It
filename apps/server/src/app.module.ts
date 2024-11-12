import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { QuestionsModule } from './questions/questions.module';
import { RepliesModule } from './replies/replies.module';
import { SessionsModule } from './sessions/sessions.module';
import { SessionsAuthModule } from './sessions-auth/sessions-auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [UsersModule, PrismaModule, SessionsModule, SessionsAuthModule, SessionsAuthModule, QuestionsModule, RepliesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
