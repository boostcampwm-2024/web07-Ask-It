import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

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
