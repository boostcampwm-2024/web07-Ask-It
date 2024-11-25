import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { LoggerService } from './logger.service';
import { winstonConfig } from './winston.config';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
