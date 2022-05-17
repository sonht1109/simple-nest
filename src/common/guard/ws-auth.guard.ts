import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SocketWithAccount } from 'src/websocket/interface/socket.interface';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/orm.config';
import { AuthService } from 'src/auth/auth.service';
import { AuthPayload } from 'src/auth/interface/auth-payload.interface';
import { WsException } from '@nestjs/websockets';

export class WsAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const socket = context.switchToWs().getClient<SocketWithAccount>();
      if (socket.account) {
        return true;
      }
      const token = socket.handshake?.headers?.authorization.split(' ')[1];
      if (!token) return false;
      const payload = jwt.verify(token, SECRET_KEY) as AuthPayload;
      if (!payload.id) {
        return false;
      }
      const account = await this.authService.findOneById(payload.id);
      if (!account) {
        return false;
      }
      socket.account = account;
      return true;
    } catch (e) {
      throw new WsException(e);
    }
  }
}
