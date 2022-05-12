import { Cat } from 'src/cat/cat.entity';
import { EnumRole } from 'src/common/enum/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @Column('enum', { enum: EnumRole, default: EnumRole.USER })
  role: EnumRole;

  @OneToMany(() => Cat, (cat) => cat.owner, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  cats: Cat[];
}
