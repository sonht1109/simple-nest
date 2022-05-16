import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { WsGateway } from './websocket.gateway';

@Module({
  imports: [AuthModule],
  providers: [WsGateway],
})
export class WsModule {}
