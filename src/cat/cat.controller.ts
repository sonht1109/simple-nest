import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CatDto } from './dto/create-cat';
import { Cat } from './cat.entity';
import { CatsService } from './cat.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtStrategy)
  create(@Body() catDto: CatDto) {
    return this.catsService.create(catDto);
  }

  @Delete(':id')
  @UseGuards(JwtStrategy)
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }

  @Put()
  @UseGuards(JwtStrategy)
  update(@Body() cat: Cat) {
    return this.catsService.update(cat);
  }
}
