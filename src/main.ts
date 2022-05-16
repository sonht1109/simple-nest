import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { SocketIoAdapter } from './websocket/io-adapter';

const PORT = 3000;
const SOCKET_PORT = 3006;

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

  app.enableCors();

  // app.use(new SocketIoAdapter(app));

  await app.listen(PORT);
  Logger.warn(`Listening at http://localhost:${PORT}`);
}
bootstrap();
