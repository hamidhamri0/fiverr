import { Test, TestingModule } from '@nestjs/testing';
import { GigReviewsController } from './gig-reviews.controller';

describe('GigReviewsController', () => {
  let controller: GigReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GigReviewsController],
    }).compile();

    controller = module.get<GigReviewsController>(GigReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
