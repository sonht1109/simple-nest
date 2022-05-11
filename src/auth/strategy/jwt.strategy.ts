import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from 'src/config/orm.config';
import { AccountRepository } from '../account.repository';
import { AuthPayload } from '../inteface/auth-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountRepo: AccountRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: AuthPayload): Promise<any> {
    return await this.accountRepo.findOne({ where: { id: payload.id } });
  }
}
