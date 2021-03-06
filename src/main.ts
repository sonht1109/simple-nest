import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { SocketIoAdapter } from './websocket/io-adapter';
import { ConfigService } from '@nestjs/config';

const PORT = 3000;
const SOCKET_PORT = 3006;

// Middleware -> Interceptors -> Route Handler -> Interceptors -> Exception Filter

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple nest')
    .setDescription('Simple test practice')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ credentials: true });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useWebSocketAdapter(new SocketIoAdapter(app, app.get(ConfigService)));

  await app.listen(PORT);
  Logger.warn(`Listening at http://localhost:${PORT}`);
}
bootstrap();
