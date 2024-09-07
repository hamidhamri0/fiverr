import { Test, TestingModule } from '@nestjs/testing';
import { MetadataTagService } from './metadata-tag.service';

describe('MetadataTagService', () => {
  let service: MetadataTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadataTagService],
    }).compile();

    service = module.get<MetadataTagService>(MetadataTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
