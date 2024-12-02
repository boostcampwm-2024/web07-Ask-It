import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceConflictException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
