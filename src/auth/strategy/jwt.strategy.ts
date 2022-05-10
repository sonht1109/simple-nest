import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Account } from '../account.entity';
import { AuthService } from '../auth.service';
import { AuthPayload } from '../inteface/auth-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',
    });
  }

  async validate(payload: AuthPayload): Promise<Account> {
    const account = this.authService.findOne(payload.username);
    if (account) {
      return account;
    }
    throw new UnauthorizedException();
  }
}
