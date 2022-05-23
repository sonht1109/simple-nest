import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { join } from 'path';
import { removeAllFilesInFolder } from 'src/common/util/fs.util';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Interval(100000)
  handleInterval() {
    this.logger.debug('Called every 100 seconds');
  }

  @Cron('*/10 * * * * *')
  handleCron() {
    removeAllFilesInFolder(join(process.cwd(), 'excels'));
  }
}
