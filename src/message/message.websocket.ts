import { Injectable, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsAuthGuard } from 'src/common/guard/ws-auth.guard';
import { SocketWithAccount } from 'src/websocket/interface/socket.interface';
import { accountIdToSocketId } from 'src/websocket/websocket.gateway';

@WebSocketGateway(3006, { cors: true })
@Injectable()
export class MessageWs {
  @WebSocketServer() server: Server;

  @UseGuards(WsAuthGuard)
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
