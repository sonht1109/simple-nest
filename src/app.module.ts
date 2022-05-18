import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WsModule } from './websocket/websocket.module';
import { MessageModule } from './message/message.module';
import { CronModule } from './cron/cron.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ormConfig } from './common/configs/orm.config';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: ormConfig,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'upload') }),
    CatModule,
    FoodModule,
    AuthModule,
    WsModule,
    MessageModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
