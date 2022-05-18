import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    port = this.configService.get<number>('SOCKET_PORT');
    const server = super.createIOServer(3006, { ...options, port, cors: true });
    return server;
  }
}
