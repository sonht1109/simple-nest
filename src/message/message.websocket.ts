import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketWithAccount } from 'src/websocket/interface/socket.interface';

@WebSocketGateway(3006, { cors: true })
@Injectable()
export class MessageWs {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async onMessage(
    socket: SocketWithAccount,
    payload: { to: number; message: string },
  ) {
    socket.emit('reply_message', `From ${payload.to}: ${payload.message}`);
  }
}
