import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_ROUTE } from '../decorators/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_ROUTE,
        [context.getHandler(), context.getClass()],
      );
      if (isPublicRoute) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const token = req?.headers?.['authorization'].split(' ')[1];
      if (!token) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
}
