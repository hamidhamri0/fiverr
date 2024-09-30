import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userPreferencesDto } from './DTO/user-preferences.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUsers')
  async getAllUsers(@Req() req) {
    if (!req.user)
      throw new UnauthorizedException(
        'You are not authorized to view this page',
      );
    return await this.userService.getAllUsers();
  }

  @Post('updateUserInfo')
  async updateUserInfo(
    @CurrentUser() user,
    @Body()
    userInfo: Partial<User>,
  ) {
    return this.userService.updateUserInfo(user?.id, userInfo);
  }

  @Post('preferences')
  async updatePreferences(
    @CurrentUser() user,
    @Body()
    preferences: userPreferencesDto,
  ) {
    return this.userService.updatePreferences(
      user?.id,
      preferences.startTime,
      preferences.endTime,
      preferences.timezone,
      preferences.startDay,
      preferences.endDay,
    );
  }
}
