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
  @Roles(EnumRole.ADMIN)
  async create(@Body() catDto: CatDto) {
    return await this.catsService.create(catDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(EnumRole.ADMIN)
  async delete(@Param('id') id: string) {
    return await this.catsService.delete(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @Roles(EnumRole.ADMIN)
  async update(@Body() cat: Cat, @CurrentAccount() account: Account) {
    console.log(account);
    return await this.catsService.update(cat);
  }
}
