import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PublicRoute } from 'src/common/decorators/auth';
import { CatDto } from './cat.dto';
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
  findById(@Param('id') id: string) {
    return this.catsService.findById(id);
  }

  @Post()
  create(@Body() catDto: CatDto) {
    return this.catsService.create(catDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
