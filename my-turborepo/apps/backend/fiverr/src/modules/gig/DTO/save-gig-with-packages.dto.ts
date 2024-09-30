import {
  IsObject,
  IsNotEmptyObject,
  ValidateIf,
  IsOptional,
} from 'class-validator';
import { IsNumericStringObject } from 'src/modules/package/validator/isNumericStringObjects';
import { GigDTO } from './gig.dto';

export class SaveGigWithPackagesDTO extends GigDTO {
  @IsOptional()
  id?: string;

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  @IsNumericStringObject({
    message: 'basic must be an object with numeric keys and string values',
  })
  basic: { [key: number]: string };

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  @IsNumericStringObject({
    message: 'standard must be an object with numeric keys and string values',
  })
  standard: { [key: number]: string };

  @IsObject()
  @ValidateIf((o) => !o.id)
  @IsNotEmptyObject()
  @IsNumericStringObject({
    message: 'premium must be an object with numeric keys and string values',
  })
  premium: { [key: number]: string };
}
