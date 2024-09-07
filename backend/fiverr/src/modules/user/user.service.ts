import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserGoogleDTO, CreateUserLocalDTO } from './DTO/create-user.dto';
import { UserLanguage } from '../user-language/user-language.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return this.userRepository.find();
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
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
    let newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async createGoogleUser(user: CreateUserGoogleDTO) {
    let newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
