import { IsNotEmpty, IsString } from 'class-validator';

export class verifyCodeDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  verificationCode: string;
}
