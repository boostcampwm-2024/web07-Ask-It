import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
