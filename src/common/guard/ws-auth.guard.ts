import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SocketWithAccount } from 'src/websocket/interface/socket.interface';
import * as jwt from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';
import { AuthPayload } from 'src/auth/interface/auth-payload.interface';
import { WsException } from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';

export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const socket = context.switchToWs().getClient<SocketWithAccount>();
      if (socket.account) {
        return true;
      }
      const token = socket.handshake?.headers?.authorization.split(' ')[1];
      if (!token) return false;
      const payload = jwt.verify(
        token,
        this.configService.get<string>('SECRET_KEY'),
      ) as AuthPayload;
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
