import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class getOneByNameDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
