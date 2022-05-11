import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from 'src/auth/account.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, AccountRepository]), AuthModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService, TypeOrmModule],
})
export class CatModule {}
