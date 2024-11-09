import { Module } from '@nestjs/common';

import { SessionsController } from './sessions.controller';
import { SessionRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionRepository],
})
export class SessionsModule {}
