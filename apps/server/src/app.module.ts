import { Module } from '@nestjs/common';

import { ChatsModule } from './chats/chats.module';
import { ChatsService } from './chats/chats.service';
import { SocketModule } from './socket/socket.module';

import { AuthModule } from '@auth/auth.module';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { PrismaService } from '@prisma-alias/prisma.service';
import { QuestionsModule } from '@questions/questions.module';
import { RepliesModule } from '@replies/replies.module';
import { SessionsModule } from '@sessions/sessions.module';
import { SessionsAuthModule } from '@sessions-auth/sessions-auth.module';
import { UploadModule } from '@upload/upload.module';
import { UsersModule } from '@users/users.module';
@Module({
  imports: [
    UsersModule,
    PrismaModule,
    SessionsModule,
    SessionsAuthModule,
    SessionsAuthModule,
    QuestionsModule,
    RepliesModule,
    AuthModule,
    UploadModule,
    SocketModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
