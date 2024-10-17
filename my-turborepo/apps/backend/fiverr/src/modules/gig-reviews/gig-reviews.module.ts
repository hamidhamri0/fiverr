import { Module } from '@nestjs/common';
import { GigReviewsController } from './gig-reviews.controller';
import { GigReviewsService } from './gig-reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GigReviews } from './gig-reviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GigReviews])],
  controllers: [GigReviewsController],
  providers: [GigReviewsService],
})
export class GigReviewsModule {}
