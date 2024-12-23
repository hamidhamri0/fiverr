import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  // UseFilters,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { LocalGuard } from './guards/local.guard';
// import { GoogleAuthExceptionFilter } from './filters/google-auth.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  // @UseFilters(GoogleAuthExceptionFilter)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  // @UseFilters(GoogleAuthExceptionFilter)
  async googleAuthRedirect(@Req() req, @Res() res) {
    res.redirect('http://localhost:3000');
  }

  @Get('session')
  async isLogged(@Req() req) {
    if (req.isAuthenticated()) {
      return req.user;
    }
    throw new UnauthorizedException("You're not logged in");
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(
    @Body('username') username,
    @Body('email') email,
    @Body('password') password,
  ) {
    return await this.authService.validateLocalUser({
      username,
      email,
      password,
    });
  }
}
