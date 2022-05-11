import { Account } from 'src/auth/account.entity';
import { EnumCatGender } from 'src/common/enum/cat.gender';
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

  @Column('float', { unsigned: true, default: 0 })
  age: number;

  @ManyToOne(() => Account, (owner: Account) => owner.cats)
  owner: Account;
}
