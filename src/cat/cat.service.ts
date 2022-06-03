import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/common/exceptions/app-error';
import { CreateCatDto } from './dto/create-cat';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { Account } from 'src/auth/account.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/food.entity';
import { removeFileIfExists } from 'src/common/util/fs.util';
import { EnumCatGender } from 'src/common/enums/cat-gender.enum';
import { PaginationParams } from 'src/common/dtos/pagination.dto';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepo: CatRepository,
    private readonly foodService: FoodService,
  ) {}

  async findAll(pagination: PaginationParams) {
    const catBuilder = this.catRepo.createQueryBuilder('cat');
    return await catBuilder.paginate(pagination);
  }

  async findOne(id: number): Promise<Cat> {
    return await this.catRepo.findOne({
      where: { id },
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

  async delete(id: number, by: Account): Promise<any> {
    const currentCat = await this.findOne(id);

    if (!currentCat) {
      throw new NotFoundException('No cats found');
    }

    const isOwner = currentCat.owner.id === by.id;
    if (isOwner) {
      return await this.catRepo.delete({ id });
    }
    throw new UnauthorizedException();
  }

  async update(id: number, cat: CreateCatDto, by: Account): Promise<Cat> {
    const currentCat = await this.findOne(id);
    if (!currentCat) {
      throw new NotFoundException('No cats found');
    }
    if (by && currentCat.owner.id === by.id) {
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
      throw new BadRequestException('There are some foods not suit the cat');
    }

    throw new UnauthorizedException();
  }

  async updateImage(id: number, by: Account, file: Express.Multer.File) {
    const currentCat = await this.findOne(id);
    if (currentCat) {
      if (currentCat.owner.id === by.id) {
        await this.catRepo.save({ ...currentCat, image: file.path });
        if (currentCat.image) {
          removeFileIfExists(currentCat.image);
        }
        return { ...currentCat, image: file.path };
      } else {
        removeFileIfExists(file.path);
        throw new UnauthorizedException();
      }
    }
    removeFileIfExists(file.path);
    throw new BadRequestException('No cats found');
  }
}
