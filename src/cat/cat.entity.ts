import { EnumCatGender } from 'src/common/enum/cat.gender';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cat')
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('enum', {
    enum: EnumCatGender,
    default: EnumCatGender.MALE,
  })
  gender: EnumCatGender;

  @Column('int', { unsigned: true, default: 0 })
  age: number;
}
