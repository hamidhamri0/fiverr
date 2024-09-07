import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGigDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  subcategoryId: number;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNumber()
  @IsNotEmpty()
  packageId: number;
}
