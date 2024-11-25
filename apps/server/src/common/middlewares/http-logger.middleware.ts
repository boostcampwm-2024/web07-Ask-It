import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { LoggerService } from '@logger/logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const clientIp = req.headers['x-forwarded-for'] || req.ip;
    const formattedIp = clientIp === '::1' ? '127.0.0.1' : clientIp; // IPv6 루프백 변환
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const elapsedTime = Date.now() - startTime;

      const logMessage = `[HTTP] ${method} ${originalUrl} ${statusCode} ${contentLength || 0} - ${userAgent} ${elapsedTime}ms - IP: ${formattedIp}`;

      this.logger.log(logMessage);
    });

    next();
  }
}
