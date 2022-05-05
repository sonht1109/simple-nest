import { EntityRepository, Repository } from 'typeorm';
import { Cat } from './cat.entity';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {}
