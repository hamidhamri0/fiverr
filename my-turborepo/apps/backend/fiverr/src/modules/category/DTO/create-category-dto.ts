import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
