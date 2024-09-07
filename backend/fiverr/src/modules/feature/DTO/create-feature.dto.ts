import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

type FeatureType = 'checkbox' | 'select' | 'range' | 'input';

export class CreateFeatureDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(['checkbox', 'select', 'range', 'input'])
  type: FeatureType;
}
