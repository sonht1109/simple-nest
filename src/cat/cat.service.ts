import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumCatGender } from 'src/common/enum/cat.gender';
import { AppError } from 'src/common/exceptions/app-error';
import { DeleteResult } from 'typeorm';
import { CatDto } from './dto/create-cat';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Account } from 'src/auth/account.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepo: CatRepository,
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly authService: AuthService,
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
      relations: ['owner'],
    });
  }

  async create(catDto: CatDto): Promise<Cat> {
    if (
      catDto.gender &&
      !Object.values(EnumCatGender).includes(catDto.gender)
    ) {
      throw new AppError('Invalid gender');
    }

    const currentUser = this.request.user as Account;

    if (currentUser) {
      const owner = await this.authService.findOneById(currentUser.id);
      if (owner) {
        const newCat = await this.catRepo.create({ ...catDto, owner });
        return await this.catRepo.save(newCat);
      }
    }
    throw new AppError('Invalid user');
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
    if (cat.gender && !Object.values(EnumCatGender).includes(cat.gender)) {
      throw new AppError('Invalid gender');
    }
    return await this.catRepo.save({ ...currentCat, ...cat });
  }

  async findByAccount(id: number) {
    const [cats] = await this.catRepo
      .createQueryBuilder('c')
      .where('c.ownerId = :id', { id })
      .getManyAndCount();
    return cats;
  }
}
