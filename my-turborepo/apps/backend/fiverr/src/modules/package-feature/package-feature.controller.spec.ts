import { Test, TestingModule } from '@nestjs/testing';
import { PackageFeatureController } from './package-feature.controller';

describe('PackageFeatureController', () => {
  let controller: PackageFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageFeatureController],
    }).compile();

    controller = module.get<PackageFeatureController>(PackageFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
