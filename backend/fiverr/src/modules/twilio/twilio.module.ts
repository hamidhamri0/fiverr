import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { UserModule } from '../user/user.module';
import { TwilioController } from './twilio.controller';
import { PhoneVerificationModule } from '../phone-verification/phone-verification.module';

@Module({
  imports: [UserModule, PhoneVerificationModule],
  providers: [TwilioService],
  controllers: [TwilioController],
})
export class TwilioModule {}
