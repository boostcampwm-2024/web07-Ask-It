import { Module } from '@nestjs/common';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';

@Module({
  controllers: [RepliesController],
  providers: [RepliesService]
})
export class RepliesModule {}
