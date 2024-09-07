import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUsers')
  async getAllUsers(@Req() req) {
    if (!req.user)
      throw new UnauthorizedException(
        'You are not authorized to view this page',
      );
    return this.userService.getAllUsers();
  }
}
