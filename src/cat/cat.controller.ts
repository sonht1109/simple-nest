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
import { Roles } from 'src/common/decorators/role';
import { EnumRole } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guard/role.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.USER, EnumRole.ADMIN)
  async create(@Body() catDto: CatDto) {
    return await this.catsService.create(catDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.ADMIN, EnumRole.USER)
  async delete(@Param('id') id: string) {
    return await this.catsService.delete(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.ADMIN, EnumRole.USER)
  async update(@Body() cat: Cat) {
    return await this.catsService.update(cat);
  }

  @Get('by-account/:id')
  async findByAccount(@Param('id') id: string) {
    return await this.catsService.findByAccount(+id);
  }
}
