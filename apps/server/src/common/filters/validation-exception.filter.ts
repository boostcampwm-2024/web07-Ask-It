import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message;

    const errorMessages = typeof message === 'string' ? [message] : message;

    response.status(status).json({
      type: 'fail',
      error: {
        messages: errorMessages,
      },
    });
  }
}
