import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { LoggerService } from '@logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const request = ctx.getRequest();

    this.logger.error(
      `[${request.method}] ${request.url} ${status} - ${exception.message}`,
      exception.stack,
      'HttpException',
    );

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      const message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message;

      const errorMessages = typeof message === 'string' ? [message] : message;

      return response.status(status).json({
        messages: errorMessages,
      });
    }

    return response.status(status).json({
      message: exception.message,
    });
  }
}
