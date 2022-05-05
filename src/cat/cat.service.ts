import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumCatGender } from 'src/common/enum/cat.gender';
import { AppError } from 'src/common/exceptions/app-error';
import { DeleteResult } from 'typeorm';
import { CatDto } from './cat.dto';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private readonly catRepo: CatRepository) {}

  async findAll() {
    return this.catRepo.find();
  }

  async findOne(id: string | number): Promise<Cat> {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return await this.catRepo.findOneBy({ id: +id });
  }

  async create(catDto: CatDto): Promise<Cat> {
    if (!Object.values(EnumCatGender).includes(catDto.gender)) {
      throw new AppError('Invalid gender');
    }
    return this.catRepo.save(catDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return this.catRepo.delete({ id: +id });
  }
  async update(cat: Cat): Promise<Cat> {
    const currentCat = await this.findOne(cat.id);
    if (!currentCat) {
      throw new AppError('NOT FOUND CAT');
    }
    if (!Object.values(EnumCatGender).includes(cat.gender)) {
      throw new AppError('Invalid gender');
    }
    return this.catRepo.save(cat);
  }

  catCrossMethod() {
    return 'Cat service is injected';
  }
}
