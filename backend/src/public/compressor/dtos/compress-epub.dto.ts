import { IsNotEmpty, IsString } from 'class-validator';

export class CompressEpubDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
}
