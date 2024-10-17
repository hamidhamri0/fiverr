import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GigReviewsService } from './gig-reviews.service';
import { CreateReviewDTO } from './DTO/create-review.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'types/user';
import { LoggedUserGuard } from 'src/common/guards/logged-user.guard';

@Controller('gig-reviews')
export class GigReviewsController {
  constructor(private readonly gigReviewsService: GigReviewsService) {}

  @Post('/createReview/:gigId')
  @UseGuards(LoggedUserGuard)
  async createReview(
    @Body() body: CreateReviewDTO,
    @CurrentUser() user: User,
    @Param('gigId', new ParseUUIDPipe()) gigId: string,
  ) {
    return await this.gigReviewsService.createReview(body, user, gigId);
  }

  @Get('/getGigReviews/:gigId')
  async getGigReviews(
    @Param('gigId', new ParseUUIDPipe()) gigId: string,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('offset', new ParseIntPipe()) offset: number,
  ) {
    console.log(typeof limit, typeof offset);
    return await this.gigReviewsService.getGigReviews(gigId, limit, offset);
  }
}
