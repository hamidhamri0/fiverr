import { Test, TestingModule } from '@nestjs/testing';
import { MetadataTagController } from './metadata-tag.controller';

describe('MetadataTagController', () => {
  let controller: MetadataTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadataTagController],
    }).compile();

    controller = module.get<MetadataTagController>(MetadataTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
