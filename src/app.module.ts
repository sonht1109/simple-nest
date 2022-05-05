import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat } from './cat/cat.entity';
import { CatModule } from './cat/cat.module';
import { AuthGuard } from './common/guard/auth.guard';

export const AUTH_GUARD = 'AUTH_GUARD';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sonht',
      password: 'htson2000',
      database: 'simple-nest',
      entities: [Cat],
      synchronize: true,
    }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: AUTH_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
