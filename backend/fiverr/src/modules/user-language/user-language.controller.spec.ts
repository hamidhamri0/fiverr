import { Test, TestingModule } from '@nestjs/testing';
import { UserLanguageController } from './user-language.controller';

describe('UserLanguageController', () => {
  let controller: UserLanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLanguageController],
    }).compile();

    controller = module.get<UserLanguageController>(UserLanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
