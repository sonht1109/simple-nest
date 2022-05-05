import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CatDto } from './cat.dto';

@Injectable()
export class CatsService {
  db: CatDto[] = [];

  async findAll() {
    return this.db;
  }

  findById(id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    return this.db.filter((c: CatDto) => c.id === +id);
  }

  create(catDto: CatDto) {
    this.db.push(catDto);
    return catDto;
  }

  delete(id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    this.db = this.db.filter((c) => c.id !== +id);
    return 'Delete success';
  }

  catCrossMethod() {
    return 'Cat service is injected';
  }
}
