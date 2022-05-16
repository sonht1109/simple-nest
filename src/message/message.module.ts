import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MessageWs } from './message.websocket';

@Module({
  imports: [AuthModule],
  providers: [MessageWs],
})
export class MessageModule {}
