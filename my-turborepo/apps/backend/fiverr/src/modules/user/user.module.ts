import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PhoneVerificationModule } from '../phone-verification/phone-verification.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PhoneVerificationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
