import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/role';
import { EnumRole } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { CreateFoodDto } from './dto/create-food';
import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.ADMIN)
  create(@Body() foodDto: CreateFoodDto) {
    return this.foodService.create(foodDto);
  }

  @Get('by-min-age/:age')
  findByMinAge(@Param('age') age: string) {
    return this.foodService.findByMinAge(+age);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.foodService.delete(+id);
  }
}
