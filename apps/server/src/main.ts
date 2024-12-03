import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('NestJs API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(port);
}

const args = process.argv.slice(2);

if (args.includes('http')) {
  bootstrap(Number(process.env.API_SERVER_PORT ?? '3000'));
} else if (args.includes('ws')) {
  bootstrap(Number(process.env.SOCKET_SERVER_PORT ?? '4000'));
}
