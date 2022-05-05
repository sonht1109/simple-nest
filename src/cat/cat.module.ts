import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';

@Module({
  imports: [],
  controllers: [CatsController],
  exports: [CatsService],
  providers: [CatsService],
})
export class CatModule {}
