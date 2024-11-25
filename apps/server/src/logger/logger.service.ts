import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  log(message: string, context = 'Application') {
    this.logger.info(message, { context });
  }

  error(message: string, trace = '', context = 'Application') {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context = 'Application') {
    this.logger.warn(message, { context });
  }

  debug(message: string, context = 'Application') {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context = 'Application') {
    this.logger.verbose(message, { context });
  }
}
