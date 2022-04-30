import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { USER_ROLES } from '../../../common/constants/user-roles';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  name: string;

  @IsString()
  linkedInUrl: string;

  coverLetter: Express.Multer.File;

  @IsEnum(USER_ROLES)
  role: USER_ROLES
}