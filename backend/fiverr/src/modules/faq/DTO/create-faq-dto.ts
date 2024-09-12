import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFaqDTO {
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsString()
  @IsNotEmpty()
  answer: string;
  @IsNumber()
  order_index: number;
}
