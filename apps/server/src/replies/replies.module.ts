import { Module } from '@nestjs/common';

import { RepliesController } from './replies.controller';
import { RepliesRepository } from './replies.repository';
import { RepliesService } from './replies.service';
import { PrismaModule } from '../prisma/prisma.module';

import { SessionTokenModule } from '@src/common/guards/session-token.module';

@Module({
  imports: [PrismaModule, SessionTokenModule],
  controllers: [RepliesController],
  providers: [RepliesService, RepliesRepository],
})
export class RepliesModule {}
