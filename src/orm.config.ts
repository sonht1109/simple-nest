import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'sonht',
  password: 'htson2000',
  database: 'simple-nest',
  // entities: [Account, Food, Cat],
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export const SECRET_KEY = 'sonht';
