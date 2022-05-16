import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './orm.config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WsModule } from './websocket/websocket.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    MulterModule.register({
      dest: './upload',
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'upload') }),
    CatModule,
    FoodModule,
    AuthModule,
    WsModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
