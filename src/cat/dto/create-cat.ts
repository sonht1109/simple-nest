import { EnumCatGender } from 'src/common/enum/cat.gender';

export class CreateCatDto {
  name: string;
  gender: EnumCatGender;
  age: number;
}
