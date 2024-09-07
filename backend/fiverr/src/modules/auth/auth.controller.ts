import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  UseFilters,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { LocalGuard } from './guards/local.guard';
import { GoogleAuthExceptionFilter } from './filters/google-auth.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  // @UseFilters(GoogleAuthExceptionFilter)
  async googleAuth(@Req() req, @Res() res) {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  // @UseFilters(GoogleAuthExceptionFilter)
  async googleAuthRedirect(@Req() req, @Res() res) {
    res.redirect('http://localhost:3000');
  }

  @Get('session')
  async isLogged(@Req() req, @Res() res) {
    if (req.user) {
      return res.send(req.user);
    }
    throw new UnauthorizedException("You're not logged in");
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Body() username, @Body() email, @Body() password, @Res() res) {
    // console.log('LOGIN', username, email, password);
    // let user = this.authService.validateLocalUser({
    //   username,
    //   email,
    //   password,
    // });
    // res.send(user);
    res.send('login');
  }
}
