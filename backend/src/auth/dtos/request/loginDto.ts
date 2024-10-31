import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @MinLength(6)
  password: string;
}
