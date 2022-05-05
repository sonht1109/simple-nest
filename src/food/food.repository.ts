import { EntityRepository, Repository } from 'typeorm';
import { Food } from './food.entity';

@EntityRepository(Food)
export class FoodRepository extends Repository<Food> {}
