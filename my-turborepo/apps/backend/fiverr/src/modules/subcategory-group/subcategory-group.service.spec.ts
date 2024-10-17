import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoryGroupService } from './subcategory-group.service';

describe('SubcategoryGroupService', () => {
  let service: SubcategoryGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcategoryGroupService],
    }).compile();

    service = module.get<SubcategoryGroupService>(SubcategoryGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
