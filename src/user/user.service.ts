import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/common/exceptions/app-error';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepo.save(dto);
  }

  async findOne(id: string | number): Promise<User> {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return this.userRepo.findOne({ where: { id: +id }, relations: ['cats'] });
  }

  async update(user: User): Promise<User> {
    const currentUser = await this.findOne(user.id);
    if (!currentUser) {
      throw new AppError('Invalid user');
    }
    return this.userRepo.save({ ...currentUser, ...user });
  }
}
