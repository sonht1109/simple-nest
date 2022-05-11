import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from 'src/auth/account.entity';
import { Cat } from 'src/cat/cat.entity';
import { Food } from 'src/food/food.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sonht',
  password: 'htson2000',
  database: 'simple-nest',
  entities: [Account, Food, Cat],
  synchronize: true,
};

export const SECRET_KEY = 'sonht';
