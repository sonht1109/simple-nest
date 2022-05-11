import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentAccount } from 'src/common/decorators/current-user';
import { Roles } from 'src/common/decorators/role';
import { EnumRole } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Account } from './account.entity';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() accountDto: CreateAccountDto) {
    return this.authService.register(accountDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@CurrentAccount() account: Account) {
    return this.authService.generateToken(account);
  }

  @Get('accounts')
  @Roles(EnumRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get('accounts/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOneById(+id);
  }
}
