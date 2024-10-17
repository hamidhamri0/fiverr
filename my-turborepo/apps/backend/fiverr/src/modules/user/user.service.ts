import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserGoogleDTO, CreateUserLocalDTO } from './DTO/create-user.dto';
import { UserLanguage } from '../user-language/user-language.entity';
import { PhoneVerificationService } from '../phone-verification/phone-verification.service';
import * as moment from 'moment-timezone';
import { updateUserDto } from './DTO/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly phoneVerificationService: PhoneVerificationService,
  ) {}

  async getAllUsers() {
    return this.userRepository.find();
  }

  async updatePreferences(
    userId: string,
    startTime: string,
    endTime: string,
    timezone: string,
    startDay: number,
    endDay: number,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Use current date as base date
    const baseDate = moment().format('YYYY-MM-DD');

    // Convert local time to UTC
    const utcStartTime = moment
      .tz(`${baseDate} ${startTime}`, timezone)
      .utc()
      .format('HH:mm:ss');
    const utcEndTime = moment
      .tz(`${baseDate} ${endTime}`, timezone)
      .utc()
      .format('HH:mm:ss');

    user.preferredStartTime = utcStartTime;
    user.preferredEndTime = utcEndTime;
    user.timezone = timezone;
    user.preferredStartDay = startDay;
    user.preferredEndDay = endDay;

    return this.userRepository.save(user);
  }

  async updateEmailToVerified(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.isVerifiedEmail = true;
      user.emailVerificationCode = null;
      await this.phoneVerificationService.deletePhoneVerificationByUserId(
        userId,
      );
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async updateUserInfo(userId: string, userInfo: updateUserDto) {
    if (userInfo?.username) {
      const user = await this.userRepository.findOne({
        where: { username: userInfo.username },
      });
      if (user) {
        throw new BadRequestException('Username already exists');
      }
    }
    return await this.userRepository.update(userId, {
      ...userInfo,
      isNew: false,
    });
  }

  async storeEmailVerificationCode(email: string, verificationCode: string) {
    const user = await this.findOneByEmail(email);
    if (user && verificationCode) {
      user.emailVerificationCode = verificationCode;
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async updatePhoneNumberToVerified(userId: string, phoneNumber: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.isVerifiedPhoneNumber = true;
      user.phoneNumber = phoneNumber;
      console.log(user);
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async findOneByGoogleId(googleId: string) {
    return this.userRepository.findOne({ where: { googleId } });
  }
  async findOneByGoogleIdOrEmail(googleId: string, email: string) {
    return this.userRepository.findOne({
      where: [{ googleId }, { email }],
    });
  }

  async addLanguagesToUser(userId: string, languageIds: number[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['languages'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const languages = languageIds.map((id) => ({ id }) as UserLanguage);
    user.languages = [...user.languages, ...languages];

    return await this.userRepository.save(user);
  }

  async removeLanguagesFromUser(userId: string, languageIds: number[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['languages'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const languages = languageIds.map((id) => ({ id }) as UserLanguage);
    user.languages = user.languages.filter(
      (lang) => !languages.some((l) => l.id === lang.id),
    );

    return await this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createLocalUser(user: CreateUserLocalDTO) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async createGoogleUser(user: CreateUserGoogleDTO) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
