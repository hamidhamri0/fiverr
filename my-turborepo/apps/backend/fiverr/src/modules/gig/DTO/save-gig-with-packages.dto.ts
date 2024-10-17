import {
  IsObject,
  IsNotEmptyObject,
  ValidateIf,
  IsOptional,
} from 'class-validator';
import { GigDTO } from './gig.dto';

export class SaveGigWithPackagesDTO extends GigDTO {
  @IsOptional()
  id?: string;

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  basic: { [key: number]: string };

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  standard: { [key: number]: string };

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  premium: { [key: number]: string };
}
