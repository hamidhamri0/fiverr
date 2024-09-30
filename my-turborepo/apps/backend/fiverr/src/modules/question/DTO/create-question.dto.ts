import {
  IsString,
  IsArray,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsObject,
  IsOptional,
  isArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArraySize } from '../validator/ArraySize';

export enum QuestionTypeGenre {
  MULTIPLE = 'multiple',
  INPUT = 'input',
}

class QuestionType {
  @IsEnum(QuestionTypeGenre)
  genre: QuestionTypeGenre;

  @IsBoolean()
  multiple: boolean;
}

export class Question {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  question: string;

  @IsArray()
  @IsString({ each: true })
  @ArraySize({
    message:
      'Options array size must be between 2 and 5 when genre is "multiple"',
  })
  options: string[];
  @IsObject()
  @ValidateNested()
  @Type(() => QuestionType)
  type: QuestionType;
}

export class SaveQuestionDto {
  @IsArray()
  @ValidateNested()
  @Type(() => Question)
  @ArrayMinSize(2, {
    message: 'at least two questions',
  })
  @ArrayMaxSize(5)
  question: Question[];
}
