import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PublicRoute } from 'src/common/decorators/auth';
import { CatDto } from './cat.dto';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @PublicRoute()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Post()
  create(@Body() catDto: CatDto) {
    return this.catsService.create(catDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }

  @Put()
  update(@Body() cat: Cat) {
    return this.catsService.update(cat);
  }
}
