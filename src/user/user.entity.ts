import { Cat } from 'src/cat/cat.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
