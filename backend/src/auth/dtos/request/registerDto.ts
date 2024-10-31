import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
