import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from './base.exception';

export class ResourceNotFoundException extends BaseHttpException {
  constructor(resource: string) {
    super(`${resource}를 찾을 수 없습니다.`, HttpStatus.NOT_FOUND);
  }
}

export class ResourceConflictException extends BaseHttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}

export class DatabaseException extends BaseHttpException {
  constructor(operation: string) {
    super(`데이터베이스 ${operation} 중 오류가 발생했습니다`, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static create(entity: string) {
    return new DatabaseException(`${entity} 생성`);
  }

  static read(entity: string) {
    return new DatabaseException(`${entity} 조회`);
  }

  static update(entity: string) {
    return new DatabaseException(`${entity} 수정`);
  }

  static delete(entity: string) {
    return new DatabaseException(`${entity} 삭제`);
  }
}
