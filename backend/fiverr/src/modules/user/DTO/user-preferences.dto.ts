import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class userPreferencesDto {
  @IsString()
  @IsNotEmpty()
  startTime: string;
  @IsString()
  @IsNotEmpty()
  endTime: string;
  @IsString()
  @IsNotEmpty()
  timezone: string;
  @IsNotEmpty()
  @IsNumber()
  startDay: number;
  @IsNotEmpty()
  @IsNumber()
  endDay: number;
}
