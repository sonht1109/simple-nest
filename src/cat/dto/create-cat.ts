import { ApiProperty } from '@nestjs/swagger';
import { EnumCatGender } from 'src/common/enums/cat-gender.enum';

export class CreateCatDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: EnumCatGender;
  @ApiProperty()
  age: number;
}
