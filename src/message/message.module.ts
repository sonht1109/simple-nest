import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JobModule } from 'src/job/job.module';
import { MessageWs } from './message.websocket';

@Module({
  imports: [AuthModule, JobModule],
  providers: [MessageWs],
})
export class MessageModule {}
