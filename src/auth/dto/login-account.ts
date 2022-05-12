import { ApiProperty } from '@nestjs/swagger';

export class LoginAccountDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
