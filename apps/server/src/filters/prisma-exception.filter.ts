import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    const errorResponse = {
      type: 'fail',
      error: {
        message: '알 수 없는 오류가 발생했습니다.',
      },
    };

    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') errorResponse.error.message = '이미 존재하는 값입니다. 다른 값을 사용하세요.';
      else errorResponse.error.message = `Prisma 오류 발생: ${exception.message}`;
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      errorResponse.error.message = `알 수 없는 Prisma 오류 발생: ${exception.message}`;
    } else if (exception instanceof PrismaClientRustPanicError) {
      errorResponse.error.message = 'Prisma 엔진에서 패닉이 발생했습니다. 관리자에게 문의하세요.';
    } else if (exception instanceof PrismaClientInitializationError) {
      errorResponse.error.message = 'Prisma 초기화 오류가 발생했습니다. 설정을 확인하세요.';
    } else if (exception instanceof PrismaClientValidationError) {
      errorResponse.error.message = `유효성 검사 오류: ${exception.message}`;
    }

    response.status(status).json(errorResponse);
  }
}
