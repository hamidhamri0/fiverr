import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateReviewDTO {
  @IsString()
  @IsNotEmpty()
  review: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
