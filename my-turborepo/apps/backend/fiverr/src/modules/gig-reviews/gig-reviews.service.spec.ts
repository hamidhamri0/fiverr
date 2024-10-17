import { Test, TestingModule } from '@nestjs/testing';
import { GigReviewsService } from './gig-reviews.service';

describe('GigReviewsService', () => {
  let service: GigReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GigReviewsService],
    }).compile();

    service = module.get<GigReviewsService>(GigReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
