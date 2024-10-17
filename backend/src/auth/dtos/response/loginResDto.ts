import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/DtoConstructor';
import { AuthUser } from 'src/lib/models';

export class LoginResDto extends Dto<LoginResDto> {
  @IsString()
  token: string;
  user: AuthUser;
}
