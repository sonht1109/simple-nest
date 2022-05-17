import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Interval(100000)
  handleInterval() {
    this.logger.debug('Called every 100 seconds');
  }

  @Cron('*/100 * * * * *')
  handleCron() {
    this.logger.debug('Demo cron run every 100s');
  }
}
