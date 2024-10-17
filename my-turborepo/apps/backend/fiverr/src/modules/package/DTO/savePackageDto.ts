import {
  IsObject,
  IsNotEmptyObject,
  ValidateIf,
  IsOptional,
} from 'class-validator';

export class SavePackageDTO {
  @IsOptional()
  id?: string;

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  basic: { [key: string]: string };

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  standard: { [key: string]: string };

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  premium: { [key: string]: string };
}
