import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from 'src/orm.config';
import { AuthService } from '../auth.service';
import { AuthPayload } from '../inteface/auth-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: AuthPayload): Promise<any> {
    return await this.authService.findOneById(payload.id);
  }
}
