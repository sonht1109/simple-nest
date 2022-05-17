import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/orm.config';
import { AuthPayload } from 'src/auth/interface/auth-payload.interface';
import { AuthService } from 'src/auth/auth.service';
import { SocketWithAccount } from './interface/socket.interface';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/common/guard/ws-auth.guard';

export const socketIdToAccountId: Record<string, number> = {};
export const accountIdToSocketId: Record<number, string> = {};

@WebSocketGateway(3006, { cors: true })
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly authService: AuthService) {}

  afterInit(server: Server) {
    server.use(async (socket: SocketWithAccount, next: (err?: any) => void) => {
      try {
        const currentAccount = socket.account;
        if (currentAccount) {
          return next();
        }
        const token = socket.handshake?.headers?.authorization?.split(' ')[1];
        if (!token) {
          return next();
        }
        const payload = jwt.verify(token, SECRET_KEY) as AuthPayload;
        if (!payload.id) {
          return next();
        }
        const account = await this.authService.findOneById(payload.id);
        if (account) {
          socket.account = account;
        }
      } finally {
        return next();
      }
    });
  }

  handleConnection(socket: SocketWithAccount) {
    if (!socket.account) {
      console.log('Unauthorize');
    } else {
      socketIdToAccountId[socket.id] = socket.account.id;
      accountIdToSocketId[socket.account.id] = socket.id;
    }
  }

  handleDisconnect(socket: SocketWithAccount) {
    if (!socket.account) {
      console.log('Unauthorize');
    } else {
      delete socketIdToAccountId[socket.id];
      delete accountIdToSocketId[socket.account.id];
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('me')
  async onMe(socket: SocketWithAccount) {
    socket.emit('me', socket.account);
  }
}
