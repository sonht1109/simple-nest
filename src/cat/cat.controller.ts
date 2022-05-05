import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PublicRoute } from 'src/common/decorators/auth';
import { CatDto } from './dto/create-cat';
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
  create(@Body() catDto: CatDto, @Req() req) {
    const id = req?.headers?.['authorization'].split(' ')[1];
    return this.catsService.create(catDto, id);
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
