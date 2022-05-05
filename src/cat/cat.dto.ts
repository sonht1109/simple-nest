import { EnumCatGender } from 'src/common/enum/cat.gender';

export class CatDto {
  readonly name: string;
  readonly gender: EnumCatGender;
}
