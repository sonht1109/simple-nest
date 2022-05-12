import { ApiProperty } from '@nestjs/swagger';
import { EnumRole } from 'src/common/enum/role.enum';

export class CreateAccountDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: EnumRole, default: EnumRole.USER })
  role: EnumRole;
}
