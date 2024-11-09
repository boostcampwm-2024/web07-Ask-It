import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { ErrorResponse, SuccessResponse } from './response.interface';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponse | ErrorResponse> {
    return next.handle().pipe(
      map((data) => {
        return {
          type: 'success',
          data: data || {},
        };
      }),
    );
  }
}
