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
import { CreateCatDto } from './dto/create-cat';
import { CatsService } from './cat.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CurrentAccount } from 'src/common/decorators/current-user';
import { Account } from 'src/auth/account.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Cat')
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
  @ApiBearerAuth()
  async create(
    @Body() CreateCatDto: CreateCatDto,
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.create(CreateCatDto, by);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @CurrentAccount() by: Account) {
    return await this.catsService.delete(id, by);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() cat: CreateCatDto,
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.update(+id, cat, by);
  }

  @Get('by-account/:id')
  async findByAccount(@Param('id') id: string) {
    return await this.catsService.findByAccount(+id);
  }

  @Post('feed/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async feed(
    @Param('id') id: string,
    @Body() { foods }: { foods: number[] },
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.feed(+id, foods, by);
  }
}
