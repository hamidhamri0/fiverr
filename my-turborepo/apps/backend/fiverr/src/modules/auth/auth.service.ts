import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateLocalUser({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      const userByUsername = await this.userService.findOneByUsername(username);
      if (userByUsername)
        throw new UnauthorizedException('Username already exists');
      return await this.userService.createLocalUser({
        email,
        password,
        username,
      });
    }

    if (user.password !== password)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async validateGoogleUser({
    googleId,
    email,
    name,
    picture,
  }: {
    googleId: string;
    email: string;
    name: string;
    picture: string;
  }) {
    let userWithGoogle = await this.userService.findOneByGoogleId(googleId);
    let userWithEmail = await this.userService.findOneByEmail(email);

    if (userWithGoogle) return userWithGoogle;
    if (!userWithGoogle && !userWithEmail) {
      userWithGoogle = await this.userService.createGoogleUser({
        googleId,
        email,
        name,
        picture,
      });
      return userWithGoogle;
    }
    throw new UnauthorizedException('Email already exists');
  }
}
