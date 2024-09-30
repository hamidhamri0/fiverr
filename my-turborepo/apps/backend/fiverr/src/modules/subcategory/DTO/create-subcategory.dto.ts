import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubcategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
