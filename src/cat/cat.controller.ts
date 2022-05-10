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
import { AuthenticationGuard } from 'src/common/guard/auth.guard';

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
  @UseGuards(AuthenticationGuard)
  create(@Body() catDto: CatDto) {
    return this.catsService.create(catDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }

  @Put()
  @UseGuards(AuthenticationGuard)
  update(@Body() cat: Cat) {
    return this.catsService.update(cat);
  }
}
