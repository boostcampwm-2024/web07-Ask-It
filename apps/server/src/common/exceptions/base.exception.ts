import { HttpStatus } from '@nestjs/common';

export class BaseHttpException extends Error {
  constructor(
    message: string,
    public readonly statusCode: HttpStatus,
  ) {
    super(message);
  }
}
