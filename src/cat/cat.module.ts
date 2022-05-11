import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from 'src/auth/account.repository';
import { UserModule } from 'src/user/user.module';
import { CatsController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), UserModule],
  controllers: [CatsController],
  exports: [CatsService],
  providers: [CatsService],
})
export class CatModule {}
