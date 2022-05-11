import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFoodDto } from './dto/create-food';
import { Food } from './food.entity';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepo: FoodRepository,
  ) {}

  async findAll(): Promise<Food[]> {
    return this.foodRepo.find();
  }

  async findOne(id: string): Promise<Food> {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return this.foodRepo.findOneBy({ id: +id });
  }

  async create(foodDto: CreateFoodDto) {
    return this.foodRepo.save(foodDto);
  }

  async findByMinAge(age: number) {
    const foods = await this.foodRepo
      .createQueryBuilder('f')
      .where('f.minAge >= :age', { age })
      .getMany();
    return foods;
  }
}
