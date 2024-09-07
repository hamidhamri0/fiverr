import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UserLanguage } from './user-language.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminGuard } from 'src/common/guards/admin.guard';

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

  async createLanguage(language: string) {
    let newLanguage = this.userLanguageRepository.create({ language });
    return this.userLanguageRepository.save(newLanguage);
  }

  async deleteLanguage(id: number) {
    return this.userLanguageRepository.delete({ id });
  }
}
