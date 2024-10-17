import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  password: string;

  @IsString()
  username: string;
}
