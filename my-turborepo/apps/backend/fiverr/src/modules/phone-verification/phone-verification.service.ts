import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerification } from './phone-verification.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class PhoneVerificationService {
  constructor(
    @InjectRepository(PhoneVerification)
    private readonly phoneVerificationRepository: Repository<PhoneVerification>,
  ) {}

  async findOneByPhoneNumber(phoneNumber: string) {
    return this.phoneVerificationRepository.findOne({
      where: { phoneNumber },
      relations: ['user'],
    });
  }

  async updatePhoneVerification(
    userId: string,
    phoneNumber: string,
    verificationCode: string,
  ) {
    const phoneVerification = await this.phoneVerificationRepository.findOne({
      where: { user: { id: userId } },
    });
    if (phoneVerification) {
      phoneVerification.phoneNumber = phoneNumber;
      phoneVerification.verificationCode = verificationCode;
      phoneVerification.createdAt = new Date();
      phoneVerification.expiresAt = new Date(
        new Date().getTime() + 1000 * 60 * 5, // 5 minutes
      );
      return this.phoneVerificationRepository.save(phoneVerification);
    }
  }

  async deletePhoneVerificationByUserId(
    userId: string,
  ): Promise<PhoneVerification> {
    const phoneVerification = await this.phoneVerificationRepository.findOne({
      where: { user: { id: userId } },
    });
    if (phoneVerification) {
      return this.phoneVerificationRepository.remove(phoneVerification);
    }
  }

  async storePhoneVerificationCode(
    userId: string,
    phoneNumber: string,
    verificationCode: string,
  ) {
    let phoneVerification = await this.phoneVerificationRepository.findOne({
      where: { user: { id: userId } },
    });
    if (phoneVerification) {
      phoneVerification.phoneNumber = phoneNumber;
      phoneVerification.verificationCode = verificationCode;
      phoneVerification.expiresAt = new Date(
        new Date().getTime() + 1000 * 60 * 5, // 5 minutes
      );
    } else {
      phoneVerification = new PhoneVerification();
      phoneVerification.user = { id: userId } as User;
      phoneVerification.phoneNumber = phoneNumber;
      phoneVerification.verificationCode = verificationCode;
      phoneVerification.createdAt = new Date();
      phoneVerification.expiresAt = new Date(
        new Date().getTime() + 1000 * 60 * 5, // 5 minutes
      );
    }

    return this.phoneVerificationRepository.save(phoneVerification);
  }
}
