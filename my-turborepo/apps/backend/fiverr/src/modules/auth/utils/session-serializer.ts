import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

type UserType = {
  userId: string;
  type: string;
};

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    if (user.googleId) {
      done(null, { userId: user.googleId, type: 'google' });
    } else if (user.id) {
      done(null, { userId: user.googleId, type: 'local' });
    }
  }

  async deserializeUser({ userId, type }: UserType, done: Function) {
    console.log('deserializeUser');
    if (type === 'local') {
      const user = await this.userService.findOneById(userId);
      done(null, user);
    } else if (type === 'google') {
      const user = await this.userService.findOneByGoogleId(userId);
      done(null, user);
    }
  }
}
