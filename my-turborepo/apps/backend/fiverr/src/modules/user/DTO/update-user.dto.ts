import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsNumber()
  preferredHours?: number;
}
