import { IsString } from 'class-validator';
import { AuthUser } from 'src/data/models';
import { Dto } from 'src/lib/dto/DtoConstructor';

export class LoginResDto extends Dto<LoginResDto> {
  @IsString()
  token: string;
  user: AuthUser;
}
