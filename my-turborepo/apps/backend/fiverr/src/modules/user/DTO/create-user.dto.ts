// create user dto with properties (name(optional), email, password, username(optional), country(optional), picture(optional), preferredHours(optional), isNew(optional), googleId(optional), appleId(optional), facebookId(optional)
// and imply class validators

import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LastVisitedGig } from '../user.entity';

class BaseUserDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsNumber()
  preferredHours?: number;

  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  appleId?: string;

  @IsOptional()
  @IsString()
  facebookId?: string;
}

export class CreateUserLocalDTO extends BaseUserDTO {
  @IsString()
  password: string;

  @IsOptional()
  lastVisitedGigs?: LastVisitedGig[];
}
export class CreateUserGoogleDTO extends BaseUserDTO {
  @IsString()
  googleId: string;

  @IsOptional()
  lastVisitedGigs?: LastVisitedGig[];

  @IsOptional()
  @IsString()
  password?: string;
}
