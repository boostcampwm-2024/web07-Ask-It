import { ResourceConflictException } from '@common/exceptions/resource.exception';

export class UserConflictException extends ResourceConflictException {
  static duplicateField(field: string) {
    return new UserConflictException(`이미 존재하는 ${field}입니다.`);
  }
}
