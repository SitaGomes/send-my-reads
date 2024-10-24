import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendBookDTO {
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
