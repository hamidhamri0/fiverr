import { IsEmpty, IsEnum, IsString } from 'class-validator';
import { Proficiency } from '../user-language.entity';

export class createLanguageDto {
  @IsString()
  @IsEmpty()
  language: string;

  @IsEnum(Proficiency)
  @IsString()
  proficiency: Proficiency;
}
