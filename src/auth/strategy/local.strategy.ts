import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { LoginAccountDto } from '../dto/login-account';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(loginDto: LoginAccountDto) {
    const account = this.authService.authentication(
      loginDto.username,
      loginDto.password,
    );
    if (account) return account;
    throw new UnauthorizedException();
  }
}
