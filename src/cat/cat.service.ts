import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumCatGender } from 'src/common/enum/cat.gender';
import { AppError } from 'src/common/exceptions/app-error';
import { CreateCatDto } from './dto/create-cat';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { Account } from 'src/auth/account.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/food.entity';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepo: CatRepository,
    private readonly foodService: FoodService,
  ) {}

  async findAll() {
    return this.catRepo.find();
  }

  async findOne(id: string | number): Promise<Cat> {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return await this.catRepo.findOne({
      where: { id: +id },
      relations: ['owner', 'foods'],
    });
  }

  async create(CreateCatDto: CreateCatDto, by: Account): Promise<Cat> {
    if (
      CreateCatDto.gender &&
      !Object.values(EnumCatGender).includes(CreateCatDto.gender)
    ) {
      throw new AppError('Invalid gender', 400);
    }

    if (by) {
      const newCat = await this.catRepo.create({ ...CreateCatDto, owner: by });
      return await this.catRepo.save(newCat);
    }
    throw new UnauthorizedException();
  }

  async delete(id: string, by: Account): Promise<any> {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const currentCat = await this.findOne(+id);

    if (!currentCat) {
      return new AppError('NO CAT FOUND', 404);
    }

    const isOwner = currentCat.owner.id === by.id;
    if (isOwner) {
      return await this.catRepo.delete({ id: +id });
    }
    throw new UnauthorizedException();
  }

  async update(id: number, cat: CreateCatDto, by: Account): Promise<Cat> {
    const currentCat = await this.findOne(id);
    if (!currentCat) {
      throw new AppError('NOT CAT FOUND', 404);
    }
    if (by && currentCat.owner.id === by.id) {
      if (cat.gender && !Object.values(EnumCatGender).includes(cat.gender)) {
        throw new AppError('Invalid gender', 400);
      }
      return await this.catRepo.save({ ...currentCat, ...cat, id });
    }
    throw new UnauthorizedException();
  }

  async findByAccount(id: number) {
    const [cats] = await this.catRepo
      .createQueryBuilder('c')
      .where('c.ownerId = :id', { id })
      .getManyAndCount();
    return cats;
  }

  async feed(id: number, foodIds: number[], by: Account) {
    const currentCat = await this.findOne(id);
    if (currentCat.owner.id === by.id) {
      const foodsByIds = await this.foodService.findByIds(foodIds);

      const legal =
        foodsByIds.filter((f: Food) => f.minAge > currentCat.age).length === 0;

      if (legal) {
        currentCat.foods = foodsByIds;
        await this.catRepo.save(currentCat);
        return true;
      }
      throw new AppError('There are some foods not suit the cat', 400);
    }

    throw new UnauthorizedException();
  }
}
