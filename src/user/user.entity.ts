import { Account } from 'src/auth/account.entity';
import { Cat } from 'src/cat/cat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  email: string;

  @OneToMany(() => Cat, (cat: Cat) => cat.owner)
  cats: Cat[];

  @OneToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn()
  account: Account;
}
