import { Cat } from 'src/cat/cat.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('food')
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('float', { default: 0, unsigned: true })
  minAge: number;

  @ManyToMany(() => Cat, (cat) => cat.foods, {
    onDelete: 'CASCADE',
  })
  cats: Cat[];
}
