import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  subcategoryId: number;
}
