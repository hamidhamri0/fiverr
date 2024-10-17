import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoryGroupController } from './subcategory-group.controller';

describe('SubcategoryGroupController', () => {
  let controller: SubcategoryGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoryGroupController],
    }).compile();

    controller = module.get<SubcategoryGroupController>(SubcategoryGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
