import { Cat } from './cat/cat.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sonht',
  password: 'htson2000',
  database: 'simple-nest',
  entities: [Cat, User],
  synchronize: true,
};
