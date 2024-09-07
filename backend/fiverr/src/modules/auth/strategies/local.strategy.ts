import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // You can change the default field names
      passwordField: 'password',
      passReqToCallback: true, // This allows you to access the entire request
    });
  }

  async validate(req: Request): Promise<any> {
    const { email, password, username } = req.body;
    const user = await this.authService.validateLocalUser({
      email,
      password,
      username,
    });
    if (!user) {
      throw new UnauthorizedException('No user found');
    }
    return user;
  }
}
