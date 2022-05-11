import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Account } from 'src/auth/account.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const account: Account = (this as any).getRequest(context).user;
    if (account && !account.username) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
