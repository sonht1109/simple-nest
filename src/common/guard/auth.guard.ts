import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authRepo: AuthRepository) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      //   IS_PUBLIC_ROUTE,
      //   [context.getHandler(), context.getClass()],
      // );
      // if (isPublicRoute) {
      //   return true;
      // }
      const req = context.switchToHttp().getRequest();
      const token = req?.headers?.['authorization'].split(' ')[1];
      if (!token) return false;

      const payload: any = jwt.verify(token, 'SECRET_KEY');
      const account = this.authRepo.findOne({
        where: { username: payload.username, id: payload.id },
      });
      if (account) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
