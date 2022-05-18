import { InjectQueue } from '@nestjs/bull';
import { Injectable, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Queue } from 'bull';
import { Server } from 'socket.io';
import { WsAuthGuard } from 'src/common/guard/ws-auth.guard';
import { SocketWithAccount } from 'src/websocket/interface/socket.interface';
import { accountIdToSocketId } from 'src/websocket/websocket.gateway';

@WebSocketGateway()
@Injectable()
export class MessageWs {
  constructor(@InjectQueue('notification') private notiQueue: Queue) {}

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

    await this.notiQueue.add(
      'receive-message',
      `From ${socket.account.id}: ${payload.message}`,
    );
  }
}
