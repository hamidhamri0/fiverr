import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from '../types/google.strategy.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID:
        '332029646132-gea7ndchld2h8r8kc3jrvqumu2ee1t8j.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    { _json: profile }: { _json: GoogleUser },
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { email, sub, picture, family_name } = profile;
      const user = await this.authService.validateGoogleUser({
        googleId: sub,
        email,
        name: family_name,
        picture,
      });
      console.log(user);
      done(null, user);
    } catch (e) {
      throw e;
    }
  }
}
