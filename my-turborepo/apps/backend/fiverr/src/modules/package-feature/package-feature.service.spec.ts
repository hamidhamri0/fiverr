import { Test, TestingModule } from '@nestjs/testing';
import { PackageFeatureService } from './package-feature.service';

describe('PackageFeatureService', () => {
  let service: PackageFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageFeatureService],
    }).compile();

    service = module.get<PackageFeatureService>(PackageFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
