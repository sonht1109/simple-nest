import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { ormConfig } from './orm.config';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CatModule,
    UserModule,
    FoodModule,
    AuthModule,
  ],
  controllers: [AppController],
  // providers: [AppService, { provide: AUTH_GUARD, useClass: AuthGuard }],
  providers: [AppService],
})
export class AppModule {}
