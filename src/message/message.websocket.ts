import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketWithAccount } from 'src/websocket/interface/socket.interface';
import { accountIdToSocketId } from 'src/websocket/websocket.gateway';

@WebSocketGateway(3006, { cors: true })
@Injectable()
export class MessageWs {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async onMessage(
    socket: SocketWithAccount,
    payload: { to: number; message: string },
  ) {
    socket
      .to(accountIdToSocketId[payload.to])
      .emit('reply_message', `From ${socket.account.id}: ${payload.message}`);
  }
}
