import { IsObject } from 'class-validator';

export class updatePackageDTO {
  @IsObject()
  basic: { [key: number]: string };

  @IsObject()
  standard: { [key: number]: string };

  @IsObject()
  premium: { [key: number]: string };
}
