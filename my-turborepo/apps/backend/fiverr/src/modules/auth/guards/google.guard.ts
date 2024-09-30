import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const response = context.switchToHttp().getResponse();

    if (err) {
      console.log(err, user, info, status);
      // Handle error: Redirect or send error response
      return response.redirect('/auth/error'); // Redirect to a custom error page
      // throw err || new UnauthorizedException(info.message);
    }

    // On success, you can also handle the user here if needed
    return user;
  }

  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
