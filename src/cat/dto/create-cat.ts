import { ApiProperty } from '@nestjs/swagger';
import { EnumCatGender } from 'src/common/enum/cat.gender';

export class CreateCatDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: EnumCatGender;
  @ApiProperty()
  age: number;
}
