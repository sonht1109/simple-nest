import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { CatsController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), UserModule],
  controllers: [CatsController],
  exports: [CatsService],
  providers: [CatsService, JwtStrategy],
})
export class CatModule {}
