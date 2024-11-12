import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }

  static invalidEmail() {
    return new InvalidCredentialsException('존재하지 않는 email입니다.');
  }

  static invalidPassword() {
    return new InvalidCredentialsException('비밀번호가 올바르지 않습니다.');
  }
}

export class RefreshTokenException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }

  static invalid() {
    return new RefreshTokenException('유효하지 않은 Refresh Token입니다.');
  }

  static expired() {
    return new RefreshTokenException('만료된 Refresh Token입니다.');
  }
}

export class JwtAuthException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }

  static missingAuthHeader() {
    return new JwtAuthException('Authorization header가 존재하지 않습니다.');
  }

  static invalidAccessToken() {
    return new JwtAuthException('유효하지 않은 access token입니다.');
  }
}
