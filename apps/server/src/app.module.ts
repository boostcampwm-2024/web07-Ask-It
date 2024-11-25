import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { LoggerModule } from './logger/logger.module';

import { AuthModule } from '@auth/auth.module';
import { ChatsModule } from '@chats/chats.module';
import { GlobalExceptionFilter } from '@common/filters/global-exception.filter';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { HttpLoggerMiddleware } from '@common/middlewares/http-logger.middleware';
import { PrismaModule } from '@prisma-alias/prisma.module';
import { QuestionsModule } from '@questions/questions.module';
import { RepliesModule } from '@replies/replies.module';
import { SessionsModule } from '@sessions/sessions.module';
import { SessionsAuthModule } from '@sessions-auth/sessions-auth.module';
import { SocketModule } from '@socket/socket.module';
import { UploadModule } from '@upload/upload.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    SessionsModule,
    SessionsAuthModule,
    QuestionsModule,
    RepliesModule,
    AuthModule,
    UploadModule,
    SocketModule,
    ChatsModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
