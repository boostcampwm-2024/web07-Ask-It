import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { BaseHttpException } from '../exceptions/base.exception';

@Catch(BaseHttpException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: BaseHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.statusCode).json({
      type: 'fail',
      error: {
        message: exception.message,
      },
    });
  }
}
