import { EnumCatGender } from 'src/common/enum/cat.gender';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, (owner: User) => owner.cats)
  owner: User;
}
