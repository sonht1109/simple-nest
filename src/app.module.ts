import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CatModule,
    FoodModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
