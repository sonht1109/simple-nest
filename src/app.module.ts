import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { AuthGuard } from './common/guard/auth.guard';

export const AUTH_GUARD = 'AUTH_GUARD';

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [AppService, { provide: AUTH_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
