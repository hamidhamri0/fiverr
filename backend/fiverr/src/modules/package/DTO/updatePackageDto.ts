import { IsObject } from 'class-validator';
import { IsNumericStringObject } from '../validator/isNumericStringObjects';
export class updatePackageDTO {
  @IsObject()
  @IsNumericStringObject({
    message: 'basic must be an object with numeric keys and string values',
  })
  basic: { [key: number]: string };

  @IsObject()
  @IsNumericStringObject({
    message: 'standard must be an object with numeric keys and string values',
  })
  standard: { [key: number]: string };

  @IsObject()
  @IsNumericStringObject({
    message: 'premium must be an object with numeric keys and string values',
  })
  premium: { [key: number]: string };
}
