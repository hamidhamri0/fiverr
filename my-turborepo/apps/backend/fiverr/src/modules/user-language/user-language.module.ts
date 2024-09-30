import { Module } from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import { UserLanguageController } from './user-language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguage } from './user-language.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserLanguage]), UserModule],
  providers: [UserLanguageService],
  controllers: [UserLanguageController],
})
export class UserLanguageModule {}
