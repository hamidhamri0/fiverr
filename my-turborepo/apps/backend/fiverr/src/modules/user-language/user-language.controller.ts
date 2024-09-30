import { Controller, Post } from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import { createLanguageDto } from './DTO/create-language.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('userLanguage')
export class UserLanguageController {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @Post('createLanguage')
  async createLanguage(
    @CurrentUser() user,
    createLanguageDto: createLanguageDto,
  ) {
    return await this.userLanguageService.createLanguage(
      user?.id,
      createLanguageDto,
    );
  }
}
