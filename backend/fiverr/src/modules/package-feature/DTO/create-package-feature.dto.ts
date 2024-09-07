import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPackageFeatureDTO {
  @IsNumber()
  packageId: number;
  @IsNumber()
  featureId: number;
  @IsString()
  @IsNotEmpty()
  value: string;
}
