import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { NotificationConsumer } from 'src/notification/notification.consumer';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'notification' }),
    forwardRef(() => MessageModule),
  ],
  providers: [NotificationConsumer],
  exports: [BullModule],
})
export class JobModule {}
