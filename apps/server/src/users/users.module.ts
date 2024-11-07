import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
