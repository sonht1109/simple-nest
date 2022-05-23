import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageWs } from 'src/message/message.websocket';
import { accountIdToSocketId } from 'src/websocket/websocket.gateway';

@Processor('notification')
export class NotificationConsumer {
  constructor(private readonly messageWs: MessageWs) {}

  @Process('receive-message')
  async handleNotification(
    job: Job<{ from: number; to: number; message: string }>,
  ) {
    const { from, to } = job.data;
    this.messageWs.server
      .to(accountIdToSocketId[to])
      .emit('notification', 'You get a message from ' + from);
  }
}
