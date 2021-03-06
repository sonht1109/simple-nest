import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FoodModule } from 'src/food/food.module';
import { CatsController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), AuthModule, FoodModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService, TypeOrmModule],
})
export class CatModule {}
