import { EnumRole } from 'src/common/enum/role.enum';

export class CreateAccountDto {
  username: string;
  password: string;
  role: EnumRole;
}
