import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { FaqDTO } from 'src/modules/faq/DTO/faq-dto';
import { isMetadata } from '../validator/metadata.validator';
import { Gig } from '../gig.entity';

export class GigDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  subcategoryId: number;

  @IsObject({
    message: 'aboutGig must be an object',
  })
  @IsOptional()
  aboutGig?: object;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  //TEMPORARY
  @IsString()
  @IsNotEmpty()
  userId: number;

  @isMetadata()
  metadata: {
    [key: number]: number[] | number;
  };

  @IsArray()
  @ArrayMinSize(1) // Optional: Ensure the array has at least one element
  @ArrayMaxSize(100) // Optional: Ensure the array has at most 100 elements
  @Type(() => Number)
  @IsInt({ each: true })
  tagIds: number[];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @Type(() => FaqDTO)
  @IsOptional()
  faqs: FaqDTO[];
}

export type GigWithAvgRatingAndTotalReviews = Gig & {
  totalReviews: number;
  averageRating: number;
};
