import { Module } from '@nestjs/common';
import { PhoneVerificationService } from './phone-verification.service';
import { PhoneVerificationController } from './phone-verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerification } from './phone-verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneVerification])],
  controllers: [PhoneVerificationController],
  providers: [PhoneVerificationService],
  exports: [PhoneVerificationService],
})
export class PhoneVerificationModule {}
