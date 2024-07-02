import { IsNotEmpty, IsString } from 'class-validator';

export class CompressEpubDTO {
  @IsString()
  @IsNotEmpty()
  inputEpubPath: string;
}
