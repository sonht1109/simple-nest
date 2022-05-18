import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notification')
export class NotificationConsumer {
  @Process('receive-message')
  async handleNotification(job: Job<string>) {
    console.log('JOB CONSUMTER', job.data);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
