import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PublicRoute } from 'src/common/decorators/auth';
import { CreateFoodDto } from './dto/create-food';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  @PublicRoute()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Post()
  create(@Body() foodDto: CreateFoodDto) {
    return this.foodService.create(foodDto);
  }
}
