import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role';
import { EnumRole } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { CreateFoodDto } from './dto/create-food';
import { FoodService } from './food.service';

@ApiTags('Food')
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.foodService.delete(+id);
  }
}
