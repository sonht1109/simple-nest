import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentAccount } from 'src/common/decorators/current-user';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
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
}
