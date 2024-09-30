import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMetadataTagDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  metadataId: number;
}
