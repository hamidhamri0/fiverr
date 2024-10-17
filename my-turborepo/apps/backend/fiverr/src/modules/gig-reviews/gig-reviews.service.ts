import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GigReviews } from './gig-reviews.entity';
import { Repository } from 'typeorm';
import { CreateReviewDTO } from './DTO/create-review.dto';
import { User } from 'types/user';
import { Gig } from 'types/gig';

@Injectable()
export class GigReviewsService {
  constructor(
    @InjectRepository(GigReviews)
    private readonly gigReviewsRepository: Repository<GigReviews>,
  ) {}

  async createReview(body: CreateReviewDTO, user: User, gigId: string) {
    // check if the user who is submitting the review has already submitted a review for this gig and gig user id is not equal to the user id
    const review = await this.gigReviewsRepository
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.gig', 'gig')
      .leftJoinAndSelect('reviews.user', 'user')
      .where('reviews.userId = :userId', { userId: user.id })
      .andWhere('reviews.gigId = :gigId', { gigId })
      .getOne();
    if (review) {
      throw new UnauthorizedException(
        'You have already submitted a review for this gig',
      );
    }

    if (review.gig.user.id === user.id) {
      throw new UnauthorizedException('You cannot review your own gig');
    }

    return await this.gigReviewsRepository.save({
      rating: body.rating,
      review: body.review,
      user,
      gig: { id: gigId } as Gig,
    });
  }

  async getGigReviews(gigId: string, limit: number, offset: number) {
    const queryBuilder = this.gigReviewsRepository
      .createQueryBuilder('reviews')
      .leftJoin('reviews.user', 'reviewer')
      .addSelect(['reviewer.username', 'reviewer.country', 'reviewer.picture'])
      .where('reviews."gigId" = :gigId', { gigId })
      .offset(offset)
      .limit(limit)
      .setParameter('nextOffset', offset + limit);

    const isNextPage = this.gigReviewsRepository
      .createQueryBuilder('reviews')
      .select('reviews.id')
      .where('reviews."gigId" = :gigId', { gigId })
      .offset(offset + limit)
      .limit(1);

    const reviews = await queryBuilder.getMany();
    const next = await isNextPage.getOne();

    return {
      reviews,
      next: next,
      offset: offset + limit,
    };
  }
}
