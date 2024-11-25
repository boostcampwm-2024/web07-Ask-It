import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { LoggerService } from '@logger/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const { message, stack } = exception;

    this.logger.error(`[${request.method}] ${request.url} ${status} - ${message}`, stack, 'UnhandledException');

    return response.status(status).json({ message: 'Internal Server Error' });
  }
}
