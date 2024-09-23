import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class sendVerificationCodeDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
