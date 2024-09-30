import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CategoryIdDTO {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}
