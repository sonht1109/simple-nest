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
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CurrentAccount } from 'src/common/decorators/current-user';
import { Account } from 'src/auth/account.entity';

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
  @UseGuards(JwtAuthGuard)
  async create(@Body() catDto: CatDto, @CurrentAccount() by: Account) {
    return await this.catsService.create(catDto, by);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @CurrentAccount() by: Account) {
    return await this.catsService.delete(id, by);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Body() cat: Cat, @CurrentAccount() by: Account) {
    return await this.catsService.update(cat, by);
  }

  @Get('by-account/:id')
  async findByAccount(@Param('id') id: string) {
    return await this.catsService.findByAccount(+id);
  }

  @Post('feed/:id')
  @UseGuards(JwtAuthGuard)
  async feed(
    @Param('id') id: string,
    @Body() { foods }: { foods: number[] },
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.feed(+id, foods, by);
  }
}
