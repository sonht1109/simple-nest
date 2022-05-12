import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SECRET_KEY } from 'src/orm.config';
import { AuthController } from './auth.controller';
import { AccountRepository } from './account.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { Account } from './account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountRepository]),
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [TypeOrmModule, AuthService, JwtModule],
})
export class AuthModule {}
