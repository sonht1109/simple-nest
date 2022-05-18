import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NotificationConsumer } from 'src/notification/notification.consumer';

@Module({
  imports: [BullModule.registerQueue({ name: 'notification' })],
  providers: [NotificationConsumer],
  exports: [BullModule],
})
export class JobModule {}
