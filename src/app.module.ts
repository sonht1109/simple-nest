import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { AuthGuard } from './common/guard/auth.guard';
import { ormConfig } from './orm.config';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';

export const AUTH_GUARD = 'AUTH_GUARD';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CatModule,
    UserModule,
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: AUTH_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
