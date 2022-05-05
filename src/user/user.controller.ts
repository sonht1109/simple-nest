import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PublicRoute } from 'src/common/decorators/auth';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @PublicRoute()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @PublicRoute()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Put()
  update(@Body() user: User) {
    return this.userService.update(user);
  }
}
