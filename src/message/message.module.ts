import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JobModule } from 'src/job/job.module';
import { MessageWs } from './message.websocket';

@Module({
  imports: [AuthModule, forwardRef(() => JobModule)],
  providers: [MessageWs],
  exports: [MessageWs],
})
export class MessageModule {}
