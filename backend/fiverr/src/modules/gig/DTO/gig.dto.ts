import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { FaqDTO } from 'src/modules/faq/DTO/faq-dto';

export class GigDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  subcategoryId: number;

  @IsObject()
  @IsOptional()
  aboutGig?: string;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  //TEMPORARY
  @IsString()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ArrayMinSize(1) // Optional: Ensure the array has at least one element
  @ArrayMaxSize(3) // Optional: Ensure the array has at most 100 elements
  @Type(() => Number)
  @IsInt({ each: true })
  metadataIds: number[];

  @IsArray()
  @ArrayMinSize(1) // Optional: Ensure the array has at least one element
  @ArrayMaxSize(3) // Optional: Ensure the array has at most 100 elements
  @Type(() => Number)
  @IsInt({ each: true })
  metadataTagIds: number[];

  @IsArray()
  @ArrayMinSize(1) // Optional: Ensure the array has at least one element
  @ArrayMaxSize(100) // Optional: Ensure the array has at most 100 elements
  @Type(() => Number)
  @IsInt({ each: true })
  tagIds: number[];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @Type(() => FaqDTO)
  @IsOptional()
  faqs: FaqDTO[];
}
