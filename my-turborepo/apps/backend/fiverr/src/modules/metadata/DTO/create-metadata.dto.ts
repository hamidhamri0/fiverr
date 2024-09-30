import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export enum MetadataType {
  MULTI_SELECT = 'multi_select',
  SELECT = 'select',
}
export class CreateMetadataDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MetadataType)
  @IsNotEmpty()
  type: MetadataType;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;
}
