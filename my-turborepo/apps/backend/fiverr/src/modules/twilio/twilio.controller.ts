import { Body, Controller, Param, Post } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { sendVerificationCodeDto } from './DTO/send-verification-code.dto';
import { verifyCodeDto } from './DTO/verify-code-dto';

@Controller('verify')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}
  @Post('/sendVerificationCode/')
  async sendVerificationCode(
    @Body() sendVerificationCodeDto: sendVerificationCodeDto,
  ) {
    return this.twilioService.sendVerificationCode(sendVerificationCodeDto);
  }

  @Post('/verifyCode')
  async verifyCode(@Body() verifyCodeDto: verifyCodeDto) {
    return this.twilioService.verifyCode(verifyCodeDto);
  }
}
