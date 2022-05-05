import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { Food } from './food.entity';
import { FoodService } from './food.service';

@Module({
  providers: [FoodService],
  imports: [TypeOrmModule.forFeature([Food])],
  controllers: [FoodController],
})
export class FoodModule {}
