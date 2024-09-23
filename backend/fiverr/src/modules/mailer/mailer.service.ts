import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      auth: {
        user: configService.get('NODEMAILER_USER'),
        pass: configService.get('NODEMAILER_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(email: string) {
    // Generate a random 6-digit code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    try {
      // Send email
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is: ${verificationCode}`,
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
      });

      // Store the verification code in the database
      await this.userService.storeEmailVerificationCode(
        email,
        verificationCode,
      );

      return { success: true, message: 'Verification email sent' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new BadRequestException('Failed to send verification email');
    }
  }

  async verifyEmail(email: string, verificationCode: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user || user.emailVerificationCode !== verificationCode) {
      throw new BadRequestException('Invalid verification code');
    }

    // Mark the user's email as verified
    await this.userService.updateEmailToVerified(user.id);

    return { success: true, message: 'Email verified successfully' };
  }
}
