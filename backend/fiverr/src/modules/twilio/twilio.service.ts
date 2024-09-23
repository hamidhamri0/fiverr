import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { UserService } from '../user/user.service';
import { PhoneVerificationService } from '../phone-verification/phone-verification.service';
import { sendVerificationCodeDto } from './DTO/send-verification-code.dto';
import { verifyCodeDto } from './DTO/verify-code-dto';

@Injectable()
export class TwilioService {
  private twilioClient: twilio.Twilio;

  constructor(
    private userService: UserService,
    private phoneVerificationService: PhoneVerificationService,
  ) {
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendVerificationCode({ userId, phoneNumber }: sendVerificationCodeDto) {
    // Generate a random 6-digit code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    console.log(verificationCode);

    try {
      // Send SMS using Twilio
      await this.twilioClient.messages.create({
        body: `Your verification code is: ${verificationCode}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      await this.phoneVerificationService.storePhoneVerificationCode(
        userId,
        phoneNumber,
        verificationCode,
      );

      // Store the verification code in the database

      return { success: true, verificationCode };
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new BadRequestException('Failed to send verification code');
    }
  }

  async verifyCode({ phoneNumber, verificationCode }: verifyCodeDto) {
    const phoneVerificationWithUser =
      await this.phoneVerificationService.findOneByPhoneNumber(phoneNumber);
    if (
      !phoneVerificationWithUser ||
      phoneVerificationWithUser.verificationCode !== verificationCode
    ) {
      throw new BadRequestException('Invalid verification code');
    }

    const now = Date.now();
    if (phoneVerificationWithUser.expiresAt.getTime() < now) {
      throw new BadRequestException('Verification code has expired');
    }

    // Mark the user's phone as verified
    await this.userService.updatePhoneNumberToVerified(
      phoneVerificationWithUser.user.id,
      phoneNumber,
    );

    return HttpStatus.OK;
  }
}
