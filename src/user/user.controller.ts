import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() user: User) {
    return this.userService.update(user);
  }
}
