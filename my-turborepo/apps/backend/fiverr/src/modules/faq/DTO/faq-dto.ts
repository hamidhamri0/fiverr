import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FaqDTO {
  @IsString()
  id?: number;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsNumber()
  position: number;
}
