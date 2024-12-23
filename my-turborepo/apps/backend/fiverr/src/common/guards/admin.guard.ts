// add admin guard
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user || (request.user && !request.user.isAdmin))
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    return request.user.isAdmin;
  }
}
