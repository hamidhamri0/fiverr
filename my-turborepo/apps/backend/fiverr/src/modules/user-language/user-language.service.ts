import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UserLanguage } from './user-language.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { createLanguageDto } from './DTO/create-language.dto';
import { User } from '../user/user.entity';

@Injectable()
@UseGuards(new AdminGuard())
export class UserLanguageService {
  constructor(
    @InjectRepository(UserLanguage)
    private readonly userLanguageRepository: Repository<UserLanguage>,
  ) {}

  async getAllUserLanguages() {
    return this.userLanguageRepository.find();
  }

  async findOneById(id: number) {
    return this.userLanguageRepository.findOne({ where: { id } });
  }

  async findOneByLanguage(language: string) {
    return this.userLanguageRepository.findOne({ where: { language } });
  }

  async createLanguage(id: string, createLanguageDto: createLanguageDto) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    let newLanguage = this.userLanguageRepository.create(createLanguageDto);
    newLanguage.user = { id } as User;
    return this.userLanguageRepository.save(newLanguage);
  }

  async deleteLanguage(id: number) {
    return this.userLanguageRepository.delete({ id });
  }
}
